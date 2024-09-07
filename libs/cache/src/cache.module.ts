import { AllConfigType } from '@app/app';
import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';
import { RedisClientOptions } from 'redis';

@Global()
@Module({
    imports: [
        ConfigModule,
        CacheModule.registerAsync<RedisClientOptions>({
            imports: [ConfigModule],
            inject: [ConfigService],
            isGlobal: true,
            useFactory: async (configService: ConfigService<AllConfigType>) => {
                const host: string = configService.getOrThrow('redis.host', { infer: true });
                const port: number = configService.getOrThrow('redis.port', { infer: true });
                const ttl: number = configService.getOrThrow('redis.ttlDefault', { infer: true });
                const dbIndex: number = configService.getOrThrow('redis.DbIndex', { infer: true });

                return {
                    store: await redisStore({
                        socket: {
                            host,
                            port,
                        },
                        database: dbIndex,
                    }),
                    ttl,
                };
            },
        }),
    ],
    providers: [],
    exports: [CacheModule],
})
export class CacheDataModule {}
