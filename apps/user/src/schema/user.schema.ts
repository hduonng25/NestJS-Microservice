import { SchemaFactory } from '@nestjs/mongoose';
import { NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import { Users } from './user.model';

export const UserSchema = SchemaFactory.createForClass(Users);

UserSchema.pre('save', async function save(next: NextFunction) {
   try {
      if (!this.isModified('password')) return next();

      this.password = await bcrypt.hash(this.password, 10);
      return next();
   } catch (error) {
      return next(error);
   }
});
