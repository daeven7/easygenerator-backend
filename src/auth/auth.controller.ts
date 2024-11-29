import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Res,
  Logger,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import {
  cookieConfig,
  extractRefreshTokenFromCookies,
} from 'src/common/config/cookieConfig';

@Controller('auth')
export class AuthController {
  private logger = new Logger('TasksController');
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    // this.logger.log(`Sign up new user ${createUserDto.id}`)
    console.log('inside signup', createUserDto);
    return this.authService.signUp(createUserDto, res);
  }

  @Post('signin')
  signin(@Body() data: AuthDto, @Res({ passthrough: true }) res: Response) {
    console.log('inside signin', data);
    return this.authService.signIn(data, res);
  }

  // @UseGuards(AccessTokenGuard)
  // @Get('logout')
  // logout(@Req() req: Request) {
  //   this.authService.logout(req.user['sub']);
  // }

  @Post('clear-auth-cookie')
  clearAuthCookie(@Res({ passthrough: true }) res: Response) {
    this.logger.log(`Clearing authentication cookie`);
    res.clearCookie(cookieConfig.refreshToken.name);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  refreshTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userId = req.user['sub'];
    this.logger.log(`Refreshing tokens for user ID: ${userId}`);
    console.log('Inside refreshTokens', req.user);
    // const userId = req.user['sub'];
    // const username = req.user['username'];
    // const refreshToken = req.user['refreshToken'];
    // // const refreshToken= extractRefreshTokenFromCookies(req)
    // const expiresAt = req.user['exp'];
    // console.log("inside refresh token", refreshToken)
    // return this.authService.refreshTokens(
    //   userId,
    //   username,
    //   expiresAt,
    //   refreshToken,
    //   res,
    // );
    return this.authService.refreshTokens({
      userId: req.user['sub'],
      email: req.user['email'],
      expiresAt: req.user['exp'],
      refreshToken: req.user['refreshToken'],
      name: req.user['name'],
      res,
    });
  }

  @UseGuards(AccessTokenGuard)
  @Get('health')
  health(@Req() req: Request) {
    console.log('Inside health', req.user);
    return 'Welcome To The Application';
  }
}
