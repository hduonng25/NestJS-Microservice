import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserServiceExternal } from '../service';
import { CheckUserActive } from '../dto';
import { Result } from '@app/app';

@Controller()
export class UserControllerExternal {
   constructor(private readonly userServiceExternal: UserServiceExternal) {}

   /**
    *
    * @param data
    * @returns
    */
   @MessagePattern('user-active')
   public async checkUserActive(data: CheckUserActive): Promise<Result> {
      return this.userServiceExternal.checkUserActive(data);
   }
}
