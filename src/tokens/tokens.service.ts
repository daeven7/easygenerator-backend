import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RefreshTokens, RefreshTokenDocument } from './schemas/tokens.schema';
import { TokenDto } from './dto/token.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TokensService {
  private logger = new Logger('TokensService');

  constructor(
    @InjectModel(RefreshTokens.name)
    private tokensModel: Model<RefreshTokenDocument>,
  ) {}

  insert(token: TokenDto): Promise<RefreshTokenDocument> {
    let expiresAt: Date;

    if (token.expiresAt instanceof Date) {
      expiresAt = token.expiresAt;
    } else if (typeof token.expiresAt === 'number') {
      expiresAt = new Date(token.expiresAt * 1000); // Convert seconds to milliseconds
    } else {
      throw new Error(
        'Invalid expiresAt value. Must be a Date or epoch time in seconds.',
      );
    }

    const blacklistedToken = new this.tokensModel({ ...token, expiresAt });
    return blacklistedToken.save();
  }

  async existsBy(conditions: Record<string, any>): Promise<boolean> {
    const exists = await this.tokensModel.exists(conditions);
    return !!exists;
  }

  async delete(conditions: Record<string, any>): Promise<void> {
    await this.tokensModel.deleteMany(conditions);
  }

  @Cron(CronExpression.EVERY_DAY_AT_6AM)
  async clearExpiredRefreshTokens() {
    await this.delete({ expiresAt: { $lte: new Date() } });
    this.logger.debug('Expired refresh tokens cleared at 6 AM');
  }
}
