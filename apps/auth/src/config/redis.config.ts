import { RedisConfigType } from '@app/app';
import { registerAs } from '@nestjs/config';
import * as process from 'node:process';

export default registerAs(
    'redis',
    (): RedisConfigType => ({
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        ttlDefault: Number(process.env.TTL_DEFAULT),
        DbIndex: Number(process.env.DB_INDEX) || 2
    }),
);
