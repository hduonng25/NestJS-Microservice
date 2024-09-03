import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDbConnect } from './mongodb.connect';

@Module({
    imports: [
        ConfigModule,
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useClass: MongoDbConnect,
        }),
    ],
    providers: [MongoDbConnect],
})
export class DatabaseModule {}
