import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class RegisterDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name: string;
  
  @IsNotEmpty({ message: 'El correo no tiene un formato válido.' })
  @IsEmail({}, { message: 'El correo debe ser un correo válido' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;
}
