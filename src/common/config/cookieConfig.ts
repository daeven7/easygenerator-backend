import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

export const cookieConfig = {
  refreshToken: {
    name: 'refreshToken',
    options: (configService: ConfigService) => ({
      path: configService.get<string>('COOKIE_PATH', '/'),
      httpOnly: true,
      sameSite: configService.get<'none' | 'lax' | 'strict'>(
        'COOKIE_SAMESITE',
        'none',
      ),
      secure: configService.get<boolean>('COOKIE_SECURE', true),
      maxAge: configService.get<number>('COOKIE_MAXAGE', 2592000000),
    }),
  },
};

export const extractRefreshTokenFromCookies = (req: Request) => {
  const cookies = req.headers.cookie?.split('; ');
  if (!cookies?.length) {
    return null;
  }

  const refreshTokenCookie = cookies.find((cookie) =>
    cookie.startsWith(`${cookieConfig.refreshToken.name}=`),
  );

  if (!refreshTokenCookie) {
    return null;
  }

  return refreshTokenCookie.split('=')[1] as string;
};
