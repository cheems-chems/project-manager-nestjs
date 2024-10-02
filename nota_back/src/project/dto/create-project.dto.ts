// src/project/dto/create-project.dto.ts
import { IsNotEmpty, IsString, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({
    description: 'Nombre del Projecto',
    example: 'Projecto de Desarrollo web'
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Descripcion del Proyecto (opcional)',
    example: 'Este es un proyecto para desarrollar una plataforma web completa'
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Fecha de inicio del proyecto',
    example: '2024-10-01'
  })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @ApiProperty({
    description: 'Fecha de finalizacion del proyecto',
    example: '2025-10-4'
  })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  endDate: Date;

  @ApiProperty({
    description: 'ID del usuario que crea el proyecto',
    example: 'f48275c2-4d85-49df-94e5-5c9f9f9bfe1a'
  })
  @IsNotEmpty({message: 'El ID del usuario es obligatorio'})
  userId: string; 
}
