import { Injectable, BadRequestException, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RefreshTokenDocument, RefreshTokens } from '../tokens/schemas/tokens.schema';
import { TokensService } from 'src/tokens/tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private tokenService: TokensService
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    // Check if user exists
    // const userExists = await this.usersService.findByUsername(
    //   createUserDto.name,
    // );
    // if (userExists) {
    //   throw new BadRequestException('User already exists');
    // }

    const userExists = await this.usersService.findByEmail(
      createUserDto.email,
    );
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    // Hash password
    const hash = await this.hashData(createUserDto.password);
    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hash,
      id: uuidv4() 
    });

    // const tokens = await this.getTokens(newUser.id as string, newUser.username);
    const tokens = await this.getTokens(newUser.id as string, newUser.email);
    // await this.updateRefreshToken(newUser.id as string, tokens.refreshToken);
    return tokens;
  }

  async signIn(data: AuthDto) {
    // Check if user exists
    // const user = await this.usersService.findByUsername(data.username);
    const user = await this.usersService.findByEmail(data.email);
    if (!user) throw new BadRequestException('User does not exist');
    const passwordMatches = await argon2.verify(user.password, data.password);
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    // const tokens = await this.getTokens(user.id as string, user.username);
    const tokens = await this.getTokens(user.id as string, user.email);
    // await this.updateRefreshToken(user.id as string, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: string) {
    // return this.usersService.update(userId, { refreshToken: null });
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  // async updateRefreshToken(userId: string, refreshToken: string) {
  //   const hashedRefreshToken = await this.hashData(refreshToken);
  //   await this.usersService.update(userId, {
  //     refreshToken: hashedRefreshToken,
  //   });
  // }

  // async refreshTokens(userId: string, refreshToken: string) {
  //   const user = await this.usersService.findById(userId);
  //   if (!user || !user.refreshToken)
  //     throw new ForbiddenException('Access Denied');
  //   const refreshTokenMatches = await argon2.verify(
  //     user.refreshToken,
  //     refreshToken,
  //   );
  //   if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
  //   const tokens = await this.getTokens(user.id, user.username);
  //   await this.updateRefreshToken(user.id, tokens.refreshToken);
  //   return tokens;
  // }

  async refreshTokens(userId: string, username:string, expires_at:string, refreshToken: string) {
    // const user = await this.usersService.findById(userId);
    // if (!user || !user.refreshToken)
    //   throw new ForbiddenException('Access Denied');
    // const refreshTokenMatches = await argon2.verify(
    //   user.refreshToken,
    //   refreshToken,
    // );
    // if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    if(refreshToken){
      if (await this.isRefreshTokenBlackListed(refreshToken, userId))
        throw new UnauthorizedException('Invalid refresh token.');
    }

    await this.tokenService.insert({
      refreshToken: refreshToken,
      expiresAt: expires_at,
      userId: userId,
    });

    const tokens = await this.getTokens(userId, username);
    // const tokens = await this.getTokens(user.id, user.username);
    // await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
  
  private isRefreshTokenBlackListed(refreshToken: string, userId: string) {
    return this.tokenService.existsBy({ refreshToken, userId });
  }

  async getTokens(userId: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          // expiresIn: '15s',
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          // expiresIn: '30s',
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
