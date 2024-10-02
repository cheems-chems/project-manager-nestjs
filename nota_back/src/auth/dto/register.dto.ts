import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class RegisterDto {
  @ApiProperty({ example: 'dhorfin', description: 'Nombre completo del usuarios'})
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name: string;
  
  @ApiProperty({ example: 'dhorfin@gmail.com', description: 'correo electronico valido'})
  @IsNotEmpty({ message: 'El correo no tiene un formato válido.' })
  @IsEmail({}, { message: 'El correo debe ser un correo válido' })
  email: string;

  @ApiProperty({ example: 'dhorfin1234', minLength: 8, description: 'Contraseña con el manos 8 caracteres'})
  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;
}
