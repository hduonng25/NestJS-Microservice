import { AppConfigsType } from './app.configs';
import { JwtConfigType } from './jwt.config.type';
import { ServiceConfigType } from './service.config.type';

export * from './app.configs';
export * from './service.config.type';
export * from './jwt.config.type';

export type AllConfigType = {
    app: AppConfigsType;
    service: ServiceConfigType;
    jwt: JwtConfigType;
};
