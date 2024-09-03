import { Injectable } from '@nestjs/common';
import { CheckUserActive } from '../dto';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Users } from '../schema';
import { Errors, Result, SuccessResult } from '@app/app';
import * as bcrypt from 'bcrypt';

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

        let filter: FilterQuery<Users> = {};

        switch (key) {
            case 'email':
                filter = {
                    email: {
                        $regex: `^${data.email}`,
                        $options: 'i',
                    },
                };
                break;
            case '_id':
                filter = {
                    _id: data._id,
                };
                break;
            default:
                break;
        }

        const result: Users = await this.userModel.findOne(filter);
        return SuccessResult.OK(result);
    }

    public async validateUser(data: { email: string; password: string }): Promise<Result | any> {
        const user: Users = await this.userModel.findOne({ email: data.email });

        if (!user) {
            return Errors.INVALID(`User not found with email ${data.email}`, [
                {
                    from: 'UserServiceExternal',
                    message: `User not found with email ${data.email}`,
                },
            ]);
        }

        const checkPassword = await bcrypt.compare(data.password, user.password);

        const loginFailed: number = user.loginFailed;

        if (loginFailed <= 4) {
            if (!checkPassword) {
                await this.userModel.findOneAndUpdate({ _id: user._id }, { loginFailed: loginFailed + 1 });

                return Errors.INVALID(`Password is incorrect`, [
                    {
                        from: 'UserServiceExternal',
                        message: `Password is incorrect`,
                    },
                ]);
            }

            await this.userModel.findOneAndUpdate({ _id: user._id }, { loginFailed: 0 });
            return user;
        } else {
            return Errors.INVALID(`Account is temporarily locked`, [
                {
                    from: 'UserServiceExternal',
                    message: `Account is temporarily locked`,
                },
            ]);
        }
    }
}
