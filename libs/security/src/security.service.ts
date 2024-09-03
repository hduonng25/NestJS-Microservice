import { AllConfigType } from '@app/app';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './dto';

@Injectable()
export class SecurityService {
    constructor(
        private readonly configService: ConfigService<AllConfigType>,
        private readonly jwtService: JwtService,
    ) {}

    public async generateToken(
        payload: Payload,
        isRefresh: boolean = true,
    ): Promise<{
        _accessToken: {
            token: string;
            expired: number;
        };
        _refreshToken?: {
            token: string;
            expired: number;
        };
    }> {
        const now: number = new Date().getTime();
        const tokenExpires: number =
            now + this.configService.getOrThrow('jwt.accessTokenExpired', { infer: true }) * 1000;
        const refreshTokenExpires: number =
            now + this.configService.getOrThrow('jwt.refreshTokenExpired', { infer: true }) * 1000;

        const [_accessToken, _refreshToken] = await Promise.all([
            //Token
            await this.jwtService.signAsync(
                {
                    ...payload,
                    _expired: tokenExpires,
                } as Payload,
                {
                    secret: this.configService.getOrThrow('jwt.secret', { infer: true }),
                    expiresIn: tokenExpires,
                },
            ),

            //Refresh token
            !isRefresh
                ? undefined
                : await this.jwtService.signAsync(
                      {
                          id: payload._id,
                          _expired: refreshTokenExpires,
                      } as Partial<Payload>,
                      {
                          secret: this.configService.getOrThrow('jwt.refresh', { infer: true }),
                          expiresIn: refreshTokenExpires,
                      },
                  ),
        ]);

        return {
            _accessToken: {
                token: _accessToken,
                expired: tokenExpires,
            },
            _refreshToken: {
                token: _refreshToken,
                expired: refreshTokenExpires,
            },
        };
    }
}
