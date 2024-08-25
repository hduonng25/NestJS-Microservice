import { Injectable } from '@nestjs/common';
import { CheckUserActive } from '../dto';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Users } from '../schema';
import { Result, SuccessResult } from '@app/app';

@Injectable()
export class UserServiceExternal {
   constructor(@InjectModel(Users.name) private readonly userModel: Model<Users>) {}

   public async checkUserActive(data: CheckUserActive): Promise<Result> {
      let key = '';

      switch (true) {
         case !!data._id:
            key = '_id';
            break;
         case !!data.email:
            key = 'email';
            break;
         default:
            break;
      }

      let filter: FilterQuery<Users> =
         key === 'email'
            ? {
                 email: {
                    $regex: `^${data.email}`,
                    $options: 'i',
                 },
              }
            : key === '_id'
              ? {
                   _id: data._id,
                }
              : {};

      const result: Users = await this.userModel.findOne(filter);
      return SuccessResult.OK(result);
   }
}
