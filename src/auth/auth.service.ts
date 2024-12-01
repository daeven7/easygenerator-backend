import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';
import { v4 as uuidv4 } from 'uuid';
import { TokensService } from 'src/tokens/tokens.service';
import { Response } from 'express';
import { cookieConfig } from 'src/common/config/cookieConfig';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private tokenService: TokensService,
  ) {}

  async signUp(createUserDto: CreateUserDto, res: Response): Promise<any> {
    this.logger.log(
      `Attempting to sign up user with email: ${createUserDto.email}`,
    );

    let userExists: UserDocument;
    try {
      userExists = await this.usersService.findByEmail(createUserDto.email);
    } catch (error) {
      this.logger.error('Error fetching user ', error);
      throw error;
    }

    if (userExists) {
      this.logger.warn(
        `Sign up failed: User with email ${createUserDto.email} already exists`,
      );
      throw new BadRequestException('User already exists');
    }
    try {
      // Hash password
      const hash = await this.hashData(createUserDto.password);
      const newUser = await this.usersService.create({
        ...createUserDto,
        password: hash,
        id: uuidv4(),
      });

      this.logger.log(`User created successfully: ${newUser.id}`);
      const tokens = await this.getTokens(
        newUser.id as string,
        newUser.email,
        createUserDto.name,
        res,
      );
      this.logger.debug(
        `Tokens generated successfully for user: ${newUser.email}`,
      );

      return tokens;
    } catch (error) {
      this.logger.error('Error during user signup', error);
      throw error;
    }
  }

  async signIn(data: AuthDto, res: Response) {
    this.logger.log(`Attempting to sign in user with email: ${data.email}`);

    // Check if user exists

    let user: UserDocument;
    try {
      user = await this.usersService.findByEmail(data.email);
    } catch (error) {
      this.logger.error('Error fetching user ', error);
      throw error;
    }

    if (!user) {
      this.logger.warn(
        `Sign in failed: User with email ${data.email} does not exist`,
      );
      throw new BadRequestException('User does not exist');
    }
    const passwordMatches = await argon2.verify(user.password, data.password);
    if (!passwordMatches) {
      this.logger.warn(
        `Sign in failed: Incorrect password for user ${data.email}`,
      );
      throw new BadRequestException('Password is incorrect');
    }

    const tokens = await this.getTokens(
      user.id as string,
      user.email,
      user.name,
      res,
    );

    this.logger.debug(`Sign in successful for user: ${data.email}`);
    return tokens;
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async refreshTokens(data: RefreshTokenDto) {
    const { userId, email, refreshToken } = data;
    this.logger.log(`Attempting to refresh tokens for user: ${email}`);

    if (refreshToken) {
      const isBlacklisted = await this.isRefreshTokenBlackListed(
        refreshToken,
        userId,
      );
      if (isBlacklisted) {
        this.logger.warn(`Refresh token for user ${email} is blacklisted`);
        throw new UnauthorizedException('Invalid refresh token.');
      }
    }

    //blacklist the old token
    try {
      await this.tokenService.insert({
        refreshToken: refreshToken,
        expiresAt: data.expiresAt,
        userId: userId,
      });
      this.logger.debug(
        `Refresh token blacklisted successfully for user: ${email}`,
      );

      const token = await this.getTokens(userId, email, data.name, data.res);
      this.logger.debug(`New tokens issued successfully for user: ${email}`);
      return token;
    } catch (error) {
      this.logger.error('Error during token refresh', error);
      throw error;
    }
  }

  private isRefreshTokenBlackListed(refreshToken: string, userId: string) {
    try {
      return this.tokenService.existsBy({ refreshToken, userId });
    } catch (error) {
      this.logger.error('Error fetching refresh token from db');
    }
  }

  async getTokens(userId: string, email: string, name: string, res: Response) {
    try {
      const accessTokenSecret =
        this.configService.get<string>('JWT_ACCESS_SECRET');
      const refreshTokenSecret =
        this.configService.get<string>('JWT_REFRESH_SECRET');
      const accessTokenExpiry =
        this.configService.get<string>('JWT_ACCESS_EXPIRY');
      const refreshTokenExpiry =
        this.configService.get<string>('JWT_REFRESH_EXPIRY');

      let refreshToken = await this.jwtService.signAsync(
        {
          sub: userId,
          email,
          name,
        },
        {
          secret: refreshTokenSecret,
          expiresIn: refreshTokenExpiry,
        },
      );

      res.cookie(cookieConfig.refreshToken.name, refreshToken, {
        ...cookieConfig.refreshToken.options,
      });

      let accessToken = await this.jwtService.signAsync(
        {
          sub: userId,
          email,
          name,
        },
        {
          secret: accessTokenSecret,
          expiresIn: accessTokenExpiry,
        },
      );

      return {
        accessToken,
      };
    } catch (error) {
      this.logger.error(
        `Error generating tokens for user: ${email}`,
        error.stack,
      );
      throw error;
    }
  }
}
