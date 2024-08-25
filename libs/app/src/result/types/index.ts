import { ErrorType } from './error.type';
import { SuccessType } from './success.type';

export * from './error.type';
export * from './success.type';

export type Result = SuccessType | ErrorType;
