import { NAME_SERVICE } from '@app/app';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class DemoService {
    constructor(@Inject(NAME_SERVICE.USER) private readonly client: ClientProxy) {}

    public async demo() {
        return this.client.send('user-active', { id: 'hduong' });
    }
}
