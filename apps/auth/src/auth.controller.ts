import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '@app/security';
import { SignInDTO } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('signIn')
    public async signIn(@Body() dto: SignInDTO) {
        return this.authService.signIn(dto);
    }

    @Post('gen-oneTimePassword')
    public async genOneTimePassword(){

        //gen one time password => send to email of user => verify one time password
        //set one time password to redis
    }

    @Public()
    @Post('signIn-oneTimePassword')
    public async signInOneTimePassword() {

    }
}
