import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ){}

  async register (registerDto: RegisterDto): Promise<any> {
    const user = await this.userService.create(registerDto);
    return { message: 'Usuario registrado', userId: user.id}
  }

  async login(userDto: LoginDto) {
    const { email, password } = userDto;
    try {
      const { exists, user } = await this.userService.findEmail(email);
      
      if (!exists || !(await bcrypt.compare(password, user.password))) {
        throw new UnauthorizedException('Credenciales Invalidas');
      }
  
      const payload = { sub: user.id, email: user.email };
      const token = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1h',
      });
  
      return {
        success: 'Usuario ha iniciado sesión exitosamente',
        token,
      };
    } catch (error) {
      console.error('Error en el login:', error);
      throw error; // Esto enviará el error al controlador
    }
  }
  
}
