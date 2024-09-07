import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class AuthModel {
    @Prop({
        required: false,
        type: String,
    })
    userId: string;

    @Prop({
        required: false,
        type: String,
    })
    refreshToken: string;

    @Prop({
        required: false,
        type: Number,
    })
    expired: number;
}
