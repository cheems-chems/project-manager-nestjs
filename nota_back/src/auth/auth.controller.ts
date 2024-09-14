import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: any){
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() user: any){
    return this.authService.login(user);
  }
}
