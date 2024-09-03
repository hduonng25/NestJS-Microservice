import { BaseSchema } from '@app/app';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Users extends BaseSchema {
    @Prop({
        required: false,
        type: String,
        searchIndex: true,
    })
    name: string;

    @Prop({
        required: false,
        type: String,
    })
    email: string;

    @Prop({
        required: false,
        type: String,
    })
    phone: string;

    @Prop({
        required: false,
        type: Number,
    })
    age: number;

    @Prop({
        required: false,
        type: String,
    })
    password: string;

    @Prop({
        required: false,
        type: String,
    })
    role: string;

    @Prop({
        required: false,
        type: Number,
        default: 0,
    })
    loginFailed: number;
}
