import { Injectable } from '@nestjs/common';
import { CreateUserDTO, UpdateUserDTO } from '../dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from '../schema';
import { CheckDuplicate, Result, SuccessResult } from '@app/app';

@Injectable()
export class UserServiceInternal {
   constructor(@InjectModel(Users.name) private readonly userModel: Model<Users>) {}

   public async getUser(): Promise<Result> {
      return SuccessResult.OK(await this.userModel.find());
   }

   public async createUser(dto: CreateUserDTO): Promise<Result> {
      await CheckDuplicate<Users>({
         model: this.userModel,
         key: ['email', 'phone'],
         value: [dto.email, dto.phone],
      });

      (await this.userModel.create(dto)).save();
      return SuccessResult.CREATED(await this.userModel.find());
   }

   public async updateUser(dto: UpdateUserDTO): Promise<Result> {
      await CheckDuplicate<Users>({
         model: this.userModel,
         _id: dto._id,
         key: ['email', 'phone'],
         value: [dto.email, dto.phone],
      });

      await this.userModel.findOneAndUpdate({ _id: dto._id }, dto);
      return SuccessResult.OK(await this.userModel.find());
   }
}
