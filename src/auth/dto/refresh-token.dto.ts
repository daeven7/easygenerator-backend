import { Response } from 'express';

export class RefreshTokenDto {
  userId: string;
  email: string;
  expiresAt: Date;
  refreshToken: string;
  name: string;
  res: Response;
}
