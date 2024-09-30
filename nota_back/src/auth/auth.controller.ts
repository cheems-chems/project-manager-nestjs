import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async register(@Body() createUserDto: RegisterDto) {
      return this.authService.register(createUserDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      console.error('Error en el login:', error.message);
  
      // Reenviar el error tal como es
      throw error;
    }
  }
  
  

  // @Post('logout')
  // @UsePipes( new ValidationPipe({ whitelist: true}))
  // async logout(@Body() logout){
  //   return logout
  // }
}
