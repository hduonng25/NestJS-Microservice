import { NAME_SERVICE, SuccessResult } from '@app/app';
import { Payload, SecurityService } from '@app/security';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SignInDTO } from './dto';
import { IUser } from './interface';
import { firstValueFrom } from 'rxjs';
import { InjectModel } from '@nestjs/mongoose';
import { AuthModel } from './schema';
import { Model } from 'mongoose';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
    constructor(
        @Inject(NAME_SERVICE.USER) private readonly client: ClientProxy,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
        @InjectModel(AuthModel.name) private readonly authModel: Model<AuthModel>,
        private readonly securityService: SecurityService,
    ) {}

    public async signIn(params: SignInDTO) {
        const user: IUser = await firstValueFrom(
            this.client.send('validate-user', { email: params.email, password: params.password }),
        );

        const payload: Payload = {
            _id: user._id,
            _name: user.name,
            _email: user.email,
            _role: user.role,
        };

        const token: {
            _accessToken: {
                token: string;
                expired: number;
            };
            _refreshToken?: {
                token: string;
                expired: number;
            };
        } = await this.securityService.generateToken(payload);

        const check = await this.authModel.findOne({ userId: user._id });

        if (!check) {
            new this.authModel({
                userId: user._id,
                refreshToken: token?._refreshToken.token,
                expired: token?._refreshToken.expired,
            }).save();

            return SuccessResult.OK(token);
        }

        await this.authModel.findOneAndUpdate(
            { userId: user._id },
            { refreshToken: token?._refreshToken.token, expired: token?._refreshToken.expired },
        );

        const cache = await this.cacheManager.get('login');

        if (cache) {
            return SuccessResult.OK(cache);
        }

        await this.cacheManager.set('login', token._accessToken);
        return SuccessResult.OK(token._accessToken);
    }
}
