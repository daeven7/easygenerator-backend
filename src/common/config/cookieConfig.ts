import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

// export const cookieConfig = {
//   refreshToken: {
//     name: 'refreshToken',
//     options: {
//       path: '/', // For production, use '/auth/api/refresh-tokens'. We use '/' for localhost in order to work on Chrome.
//       httpOnly: true,
//       // sameSite: 'strict' as 'strict',
//       // secure: true,
//       sameSite: 'none' as 'none',
//       secure: true,
//       // maxAge: 1000 * 30,
//       maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days; must match Refresh JWT expiration.
//     },
//   },
// };

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
