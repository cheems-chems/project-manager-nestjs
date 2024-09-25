import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
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
    try {
      return await this.authService.register(createUserDto);
    } catch (error) {
      console.error('Error en el registro:', error);
      throw error; // Esto enviará el error al cliente y lo registrará
    }
  }
  
  @Post('login')
  @UsePipes( new ValidationPipe({ whitelist: true}))
  async login(@Body() loginDto: LoginDto){
    return this.authService.login(loginDto);
  }

  // @Post('logout')
  // @UsePipes( new ValidationPipe({ whitelist: true}))
  // async logout(@Body() logout){
  //   return logout
  // }
}
