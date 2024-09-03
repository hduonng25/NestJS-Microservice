import { AllConfigType } from '@app/app';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';

@Injectable()
export class MongoDbConnect implements MongooseOptionsFactory {
    constructor(private readonly configService: ConfigService<AllConfigType>) {}

    createMongooseOptions(): Promise<MongooseModuleOptions> | MongooseModuleOptions {
        return {
            uri: this.configService.getOrThrow('app.mongoUri', { infer: true }),
        };
    }
}
