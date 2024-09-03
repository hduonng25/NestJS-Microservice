import { BadRequestException } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';

type TErrors = {
    message: string;
}[];

function ParseErrors(errors: TErrors): string {
    const errorsMessage: string[] = errors.map((err) => err.message);

    let message: string = '';

    if (errorsMessage.length == 1) {
        message = ` ${errorsMessage[0]} + already exists`;
    } else if (errorsMessage.length > 1) {
        message = `This ${errors.map((err) => err.message).join(' and ')} already exist`;
    }

    return message;
}

export async function CheckDuplicate<T>(params: {
    model: Model<T>;
    _id?: string;
    key: string[];
    value: string[];
}): Promise<any> {
    const errors: TErrors = [];

    for (let i = 0; i < params.key.length; i++) {
        try {
            const filter: FilterQuery<any> = {
                [params.key[i]]: {
                    $regex: `^${params.value[i]}`,
                    $options: 'i',
                },
            };

            const check = await params.model.findOne(filter);

            if (check && check._id !== params._id) {
                errors.push({
                    message: `${params.key[i]}`,
                });
            }
        } catch (error) {
            throw new BadRequestException('Exception');
        }
    }

    if (errors.length > 0) throw new BadRequestException(ParseErrors(errors));
}
