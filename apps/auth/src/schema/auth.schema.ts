import { SchemaFactory } from '@nestjs/mongoose';
import { AuthModel } from './auth.model';

export const AuthSchema = SchemaFactory.createForClass(AuthModel);
