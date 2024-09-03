import { AppConfigsType } from '@app/app';
import { ServiceConfigProduct } from './service.config.type';

export * from './service.config.type';

export type ProductConfigType = {
    app: AppConfigsType;
    service: ServiceConfigProduct;
};
