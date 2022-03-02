import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthInterface } from './interface';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    signUp(@Body() dto: AuthInterface) {
        return this.authService.signUp(dto);
    }

    @Post('signin')
    signIn() {
        return this.authService.signIn;
    }
}
