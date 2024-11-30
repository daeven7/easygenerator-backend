import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RefreshTokens, RefreshTokenDocument } from './schemas/tokens.schema';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class TokensService {
  constructor(
    @InjectModel(RefreshTokens.name)
    private tokensModel: Model<RefreshTokenDocument>,
  ) {}

  insert(token: TokenDto): Promise<RefreshTokenDocument> {
    const blacklistedToken = new this.tokensModel(token);
    return blacklistedToken.save();
  }

  async existsBy(conditions: Record<string, any>): Promise<boolean> {
    const exists = await this.tokensModel.exists(conditions);
    return !!exists; 
  }


}
