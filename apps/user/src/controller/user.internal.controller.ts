import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { UserServiceInternal } from '../service';
import { CreateUserDTO, UpdateUserDTO } from '../dto';
import { Result } from '@app/app';

@Controller('user')
export class UserControllerInternal {
   constructor(private readonly userServiceInternal: UserServiceInternal) {}

   @Get()
   public async getUser(): Promise<Result> {
      return this.userServiceInternal.getUser();
   }

   @Post()
   public async createUser(@Body() dto: CreateUserDTO): Promise<Result> {
      return this.userServiceInternal.createUser(dto);
   }

   @Put()
   public async updateUser(@Body() dto: UpdateUserDTO): Promise<Result> {
      return this.userServiceInternal.updateUser(dto);
   }
}
