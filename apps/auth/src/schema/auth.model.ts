import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class AuthModel {
    @Prop({
        required: true,
        type: String,
    })
    userId: string;

    @Prop({
        required: true,
        type: String,
    })
    refreshToken: string;

    @Prop({
        required: false,
        type: Number,
    })
    expired: number;
}
