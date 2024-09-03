import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ROLE_CONSTANT } from '../constant';

export class Payload {
    @IsString()
    _id: string;

    @IsString()
    _name: string;

    @IsString()
    _email: string;

    @IsEnum(ROLE_CONSTANT)
    _role: string;

    @IsOptional()
    _expired?: any;
}
