import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { extractRefreshTokenFromCookies } from 'src/common/config/cookieConfig';
dotenv.config();

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const token = extractRefreshTokenFromCookies(req);
          return token;
        },
      ]),
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    const refreshToken = extractRefreshTokenFromCookies(req);
    return { ...payload, refreshToken };
  }
}
