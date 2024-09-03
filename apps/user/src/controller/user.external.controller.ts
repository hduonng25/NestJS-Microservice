import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserServiceExternal } from '../service';
import { CheckUserActive } from '../dto';
import { Result } from '@app/app';
import { Users } from '../schema';

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

    @MessagePattern('validate-user')
    public async validateUser(data: { email: string; password: string }): Promise<Users> {
        return this.userServiceExternal.validateUser(data);
    }
}
