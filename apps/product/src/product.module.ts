import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import { DatabaseModule } from '@app/database';
import { ClientProvider, ClientsModule, Transport } from '@nestjs/microservices';
import { NAME_SERVICE } from '@app/app';
import { DemoController } from './demo/demo.controller';
import { DemoService } from './demo/demo.service';
import serviceConfig from './config/service.config';
import { ProductConfigType } from './config';
import { SecurityModule } from '@app/security';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['apps/product/.env'],
            load: [appConfig, serviceConfig],
        }),

        ClientsModule.registerAsync([
            {
                name: NAME_SERVICE.USER,
                inject: [ConfigService],
                imports: [ConfigModule],
                useFactory: async (
                    configService: ConfigService<ProductConfigType>,
                ): Promise<ClientProvider> => {
                    try {
                        const host: string = configService.getOrThrow('service.user.host', { infer: true });
                        const port: number = configService.getOrThrow('service.user.port', { infer: true });

                        Logger.log(
                            `Service Product connect to Microservice User on host: ${host} and port: ${port}`,
                            'AppModule - Product',
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

        DatabaseModule,
        SecurityModule,
    ],
    controllers: [DemoController],
    providers: [DemoService],
})
export class ProductModule {}
