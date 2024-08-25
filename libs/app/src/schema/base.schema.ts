import { Transform } from '@nestjs/class-transformer';
import { Prop } from '@nestjs/mongoose';

export class BaseSchema {
   _id?: string;

   @Prop({
      required: false,
      type: Boolean,
      default: true,
   })
   isActive: boolean;

   @Prop({
      required: false,
      type: Boolean,
      default: false,
   })
   isDeleted: boolean;
}
