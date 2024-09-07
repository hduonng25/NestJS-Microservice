import {  NAME_SERVICE } from "@app/app";
import { CacheDataModule } from '@app/cache';
import { DatabaseModule } from '@app/database';
import { SecurityModule } from '@app/security';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthConfigType } from './config';
import appConfig from './config/app.config';
import redisConfig from "./config/redis.config";
import serviceConfig from './config/service.config';
import { AuthModel, AuthSchema } from './schema';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['apps/auth/.env'],
            load: [appConfig, serviceConfig, redisConfig],
        }),

        ClientsModule.registerAsync([
            {
                name: NAME_SERVICE.USER,
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: async (configService: ConfigService<AuthConfigType>) => {
                    try {
                        const host: string = configService.getOrThrow('service.user.host', { infer: true });
                        const port: number = configService.getOrThrow('service.user.port', { infer: true });

                        Logger.log(
                            `Service Auth connect to Microservice User on host: ${host} and port: ${port}`,
                            'AppModule - Auth',
                        );

                        return {
                            transport: Transport.TCP,
                            options: {
                                host,
                                port,
                            },
                        };
                    } catch (error) {
                        console.log(error);
                    }
                },
            }
        ]),
        SecurityModule,
        DatabaseModule,
        CacheDataModule,
        MongooseModule.forFeature([{ name: AuthModel.name, schema: AuthSchema }]),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
