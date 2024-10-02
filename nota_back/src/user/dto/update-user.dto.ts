// src/user/dto/update-user.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Nombre completo del usuario (optional)',
    example: 'thorfin'
  })
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @ApiPropertyOptional({
    description: 'Correo electronico valido (optional)',
    example: 'thorfin@gmail.com'
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'Contraseña con al menos 8 caracteres (optional)',
    example: 'thorfin1234'
  })
  @IsOptional()
  @MinLength(8)
  password?: string;
}
