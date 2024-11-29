import { Response } from 'express';

export class RefreshTokenDto {
  userId: string;
  email: string;
  expiresAt: string;
  refreshToken: string;
  name: string;
  res: Response;
}
