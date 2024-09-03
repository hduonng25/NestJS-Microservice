import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { DatabaseModule } from '@app/database';
import { UserControllerExternal, UserControllerInternal } from './controller';
import { UserServiceExternal, UserServiceInternal } from './service';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UserSchema } from './schema';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['apps/user/.env'],
            load: [appConfig],
        }),
        DatabaseModule,
        MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
    ],
    controllers: [UserControllerExternal, UserControllerInternal],
    providers: [UserServiceExternal, UserServiceInternal],
})
export class UserModule {}
