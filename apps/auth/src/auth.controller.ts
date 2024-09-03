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
}
