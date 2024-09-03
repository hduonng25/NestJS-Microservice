import { AppConfigsType } from '@app/app';
import { ServiceConfigAuth } from './service.config.type';

export * from './service.config.type';

export type AuthConfigType = {
    app: AppConfigsType;
    service: ServiceConfigAuth;
};
