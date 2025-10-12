import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    signup(
        @Body() body: { email: string; password: string; firstName?: string; lastName?: string }
    ) {
        return this.authService.signup(body)
    }

    @Post('signin')
    async signin(@Body() body: { email: string; password: string }) {
        return this.authService.signin(body);
    }

}