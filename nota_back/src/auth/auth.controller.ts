import { Controller, Post, Body,UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async register(@Body() createUserDto: RegisterDto) {
    try {
      return this.authService.register(createUserDto);
    } catch (error) {
      console.error('Error en el registro:', error.message);
      throw error
    }
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      console.error('Error en el login:', error.message);
      throw error;
    }
  }
  
  

  // @Post('logout')
  // @UsePipes( new ValidationPipe({ whitelist: true}))
  // async logout(@Body() logout){
  //   return logout
  // }
}
