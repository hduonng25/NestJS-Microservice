import { Logger, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import serviceConfig from './config/service.config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NAME_SERVICE } from '@app/app';
import { AuthConfigType } from './config';

@Module({
   imports: [
      ConfigModule.forRoot({
         isGlobal: true,
         envFilePath: ['apps/auth/.env'],
         load: [appConfig, serviceConfig],
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
         },
      ]),
   ],
   controllers: [AuthController],
   providers: [AuthService],
})
export class AuthModule {}
