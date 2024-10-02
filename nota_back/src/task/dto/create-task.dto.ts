import { IsNotEmpty, IsString, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Nombre del titulo de la tarea',
    example: 'Sobre el back y el front'
  })
  @IsNotEmpty({ message: 'El titulo es obligatorio.' })
  @IsString({ message: 'El titulo debe ser una cadena.' })
  title: string;

  @ApiPropertyOptional({
    description: 'Descripción de la tarea',
    example: 'Hacer un resumen del back y el front'
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Fecha de entrega de la tarea',
    example: '2024-11-01'
  })
  @IsNotEmpty({ message: 'La fecha de entrega es obligatoria.' })
  @Type(() => Date)
  @IsDate({ message: 'La fecha de entrega debe ser una fecha válida.' })
  dueDate: Date;

  @ApiProperty({
    description: 'Estado de la tarea (por ejemplo, pendiente, completado)',
    example: 'pendiente'
  })
  @IsNotEmpty({ message: 'El estado es obligatorio.' })
  @IsString({ message: 'El estado debe ser una cadena.' })
  status: string;

  @ApiProperty({
    description: 'ID del Proyecto al que pertenece la tarea',
    example: 'f48275c2-4d85-49df-94e5-5c9f9f9bfe1a'
  })
  @IsNotEmpty({ message: 'El ID del proyecto es obligatorio' })
  @IsString({ message: 'El ID del Proyecto debe ser una cadena' })
  projectId: string;

  @ApiProperty({
    description: 'ID del Usuario que crea la tarea',
    example: 'a4b3c2d1-4d85-49df-94e5-5c9f9f9bfe1a'
  })
  @IsNotEmpty({ message: 'El ID del usuario es obligatorio' })
  @IsString({ message: 'El ID del usuario debe ser una cadena' })
  userId: string;
}
