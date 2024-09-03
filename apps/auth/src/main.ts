import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ConfigService } from '@nestjs/config';
import { AuthConfigType } from './config';
import { Logger, VersioningType } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.create(AuthModule);

    const configs = app.get(ConfigService<AuthConfigType>);

    const host: string = configs.getOrThrow('app.host', { infer: true });
    const port: number = configs.getOrThrow('app.port', { infer: true });
    const prefix: string = configs.getOrThrow('app.prefix', { infer: true });

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

    Logger.log(`Start service Auth on port: ${port} and host: ${host}`, 'Service - Auth');
    await app.startAllMicroservices();
    await app.listen(port);
}
bootstrap();
