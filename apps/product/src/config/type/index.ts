import { AllConfigType } from '@app/app';
import { ServiceConfigProduct } from './service.config.type';

export type AllConfigServiceProduct = AllConfigType & {
   service: ServiceConfigProduct;
};
