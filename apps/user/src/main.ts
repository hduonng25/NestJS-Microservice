import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { ConfigService } from '@nestjs/config';
import { Logger, VersioningType } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AllConfigServiceUser } from './config';

async function bootstrap() {
    const app = await NestFactory.create(UserModule);
    const configs = app.get(ConfigService<AllConfigServiceUser>);

    const host: string = configs.getOrThrow('app.host', { infer: true });
    const port: number = configs.getOrThrow('app.port', { infer: true });
    const prefix: string = configs.getOrThrow('app.prefix', {
        infer: true,
    });

    app.setGlobalPrefix(prefix);

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
    });

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.TCP,
        options: {
            host,
            port,
        },
    });

    await app.startAllMicroservices();

    Logger.log(`Start service User on port: ${port} and host: ${host}`, 'Service - User');
    await app.listen(port);
}
bootstrap();
