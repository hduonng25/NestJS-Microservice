import { HttpStatus } from '@nestjs/common';

export type SuccessType = {
   status: HttpStatus;
   code: string;
   data: any;
};
