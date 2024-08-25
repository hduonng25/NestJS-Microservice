import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, VersioningType } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ProductModule } from './product.module';
import { AllConfigServiceProduct } from './config';

async function bootstrap() {
   const app = await NestFactory.create(ProductModule);
   const configs = app.get(ConfigService<AllConfigServiceProduct>);

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

   Logger.log(`Start service Product on port: ${port} and host: ${host}`, 'Service - Product');
   await app.listen(port);
}
bootstrap();
