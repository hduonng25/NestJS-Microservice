import { registerAs } from '@nestjs/config';
import { NAME_SERVICE } from '@app/app';
import { ServiceConfigProduct } from './type';

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
