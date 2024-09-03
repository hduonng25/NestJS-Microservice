import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_CONSTANT, KEY_GUARD } from '../constant';
import { Payload } from '../dto';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '@app/app';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, KEY_GUARD.JWT_GLOBAL) {
    constructor(private readonly configService: ConfigService<AllConfigType>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true, //Neu dan false cac token het han se khong duoc decode, danh true thi nguoc lai
            secretOrKey: configService.getOrThrow('jwt.accessTokenExpired', { infer: true }),
        });
    }

    public async validate(payload: Payload): Promise<Payload> {
        console.log(JWT_CONSTANT.SECRET);
        return payload;
    }
}
