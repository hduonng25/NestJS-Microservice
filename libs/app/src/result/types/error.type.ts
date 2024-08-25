import { HttpStatus } from '@nestjs/common';

export type ErrorDetailsType = {
   from: string | '';
   method?: string | '';
   message: string | '';
};

export type ErrorType = {
   status: HttpStatus;
   code: string | '';
   message: string | '';
   details: ErrorDetailsType[];
};
