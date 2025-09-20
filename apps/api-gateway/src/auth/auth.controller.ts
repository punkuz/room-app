import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from "./dto/login-user.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //signup
  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    // Handle user signup
    return this.authService.signup(createUserDto);
  }

  //login
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    // Handle user login
    return this.authService.login(loginUserDto);
  }
}
