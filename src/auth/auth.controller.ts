import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth, GetUser } from './decorators';

import { SignUpUserDto, CreateUserDto } from './dto';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() createUserDto: CreateUserDto) {
    return this.authService.signIn(createUserDto);
  }

  @Post('signup')
  signUp(@Body() signUpUserDto: SignUpUserDto) {
    return this.authService.signUp(signUpUserDto);
  }

  @Auth()
  @Post('renew')
  renewAuth(@GetUser() user: User) {
    return this.authService.renewAuth(user);
  }
}
