import { ErrorDetailsType, ErrorType } from './types';
import { HttpStatus } from '@nestjs/common';

export class Errors {

    public static INVALID(message: string, details: ErrorDetailsType[]): ErrorType {
        return {
            status: HttpStatus.BAD_REQUEST,
            code: '',
            message: message ?? '',
            details,
        };
    }
}
