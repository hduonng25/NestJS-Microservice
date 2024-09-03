import { registerAs } from '@nestjs/config';
import { ServiceConfigAuth } from './type';
import { NAME_SERVICE } from '@app/app';

export default registerAs(
    'service',
    (): ServiceConfigAuth => ({
        user: {
            host: process.env.HOST_SERVICE_USER,
            port: Number(process.env.PORT_SERVICE_USER),
            name: NAME_SERVICE.USER,
        },
    }),
);
