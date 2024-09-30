import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
@MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
name: string;

@IsNotEmpty()
@IsEmail({}, { message: 'El email debe tener un formato válido.' })
email: string;

@MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
password: string;

}
