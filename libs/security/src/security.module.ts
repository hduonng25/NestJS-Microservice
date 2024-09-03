import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { SecurityService } from './security.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['libs/security/.env'],
            load: [jwtConfig],
        }),
        JwtModule.register({}),
    ],
    providers: [JwtStrategy, SecurityService],
    controllers: [],
    exports: [SecurityService],
})
export class SecurityModule {}
