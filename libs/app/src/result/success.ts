import { SuccessType } from './types';
import { HttpStatus } from '@nestjs/common';

export class SuccessResult {

    public static OK<T>(data: T | any): SuccessType {
        return {
            status: HttpStatus.OK,
            code: '',
            data,
        };
    }

    public static CREATED<T>(data: T | any): SuccessType {
        return {
            status: HttpStatus.CREATED,
            code: '',
            data,
        };
    }

    public static NO_CONTENT<T>(data: T | any): SuccessType {
        return {
            status: HttpStatus.NO_CONTENT,
            code: '',
            data,
        };
    }
}
