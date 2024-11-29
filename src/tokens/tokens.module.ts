import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshTokens, RefreshTokenSchema } from './schemas/tokens.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RefreshTokens.name, schema: RefreshTokenSchema },
    ]),
  ],
  controllers: [TokensController],
  providers: [TokensService],
  exports: [TokensService]
  
})
export class TokensModule {}
