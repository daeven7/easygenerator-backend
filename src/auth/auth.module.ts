import { Module, Redirect } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, TokenExpiredError } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { RefreshTokens, RefreshTokenSchema } from '../tokens/schemas/tokens.schema';
import { TokensModule } from 'src/tokens/tokens.module';

// @Module({
//   imports: [JwtModule.register({}), UsersModule],
//   controllers: [AuthController],
//   providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
// })
// export class AuthModule {}

@Module({
  imports: [
    JwtModule.register({}),
    UsersModule,
    TokensModule,
    // MongooseModule.forFeature([
    //   { name: RefreshTokens.name, schema: RefreshTokenSchema },
    // ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}

