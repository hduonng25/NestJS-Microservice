import { registerAs } from '@nestjs/config';
import { ServiceConfigProduct } from './type/service.config.type';
import { NAME_SERVICE } from '@app/app';

export default registerAs(
   'service',
   (): ServiceConfigProduct => ({
      user: {
         host: process.env.HOST_SERVICE_USER,
         port: Number(process.env.PORT_SERVICE_USER),
         name: NAME_SERVICE.USER,
      },
   }),
);
