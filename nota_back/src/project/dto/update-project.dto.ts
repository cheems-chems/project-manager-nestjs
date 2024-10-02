import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
    @ApiPropertyOptional({
        description: 'Nombre del proyecto (opcional)',
        example: 'Proyecto actualizado de Desarrollo web'
    })
    name?: string;

    @ApiPropertyOptional({
        description: 'Descripcion del proyecto (opcional)',
        example: 'Actualizancion del proyecto para incluir nuevas funcionalidades',
    })
    description?: string;

    @ApiPropertyOptional({
        description: 'Fecha de inicio del proyecto (opcional)',
        example: '2024-11-01',
    })
    startDate?: Date;

    @ApiPropertyOptional({
        description: 'Fecha de finalización del proyecto (opcional)',
        example: '2025-11-01',
    })
    endDate?: Date;

    @ApiPropertyOptional({
        description: 'ID del usuario que crea o actualiza el proyecto (opcional)',
        example: 'f48275c2-4d85-49df-94e5-5c9f9f9bfe1a',
    })
    userId?: string;
}
