import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  Res,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import { cookieConfig } from 'src/common/config/cookieConfig';

@Controller('auth')
export class AuthController {
  private logger = new Logger('AuthController');
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signUp(createUserDto, res);
  }

  @Post('signin')
  signin(@Body() data: AuthDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.signIn(data, res);
  }

  @Post('logout')
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
    return 'Ok';
  }
}
