import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RefreshTokenDocument = RefreshTokens & Document;

@Schema()
export class RefreshTokens {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  refreshToken: string;

  @Prop({ required: true , type: Date})
  expiresAt: Date;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshTokens);
