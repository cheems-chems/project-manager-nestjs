import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiPropertyOptional({
    description: 'Nuevo nombre del título de la tarea (opcional)',
    example: 'Revisar el back y el front',
  })
  title?: string;

  @ApiPropertyOptional({
    description: 'Nueva descripción de la tarea (opcional)',
    example: 'Realizar un resumen actualizado del back y el front',
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'Nueva fecha de entrega de la tarea (opcional)',
    example: '2024-11-15',
  })
  dueDate?: Date;

  @ApiPropertyOptional({
    description: 'Nuevo estado de la tarea (por ejemplo, pendiente, completado) (opcional)',
    example: 'completado',
  })
  status?: string;

  @ApiPropertyOptional({
    description: 'ID del Proyecto al que pertenece la tarea (opcional, si se desea cambiar)',
    example: 'f48275c2-4d85-49df-94e5-5c9f9f9bfe1a',
  })
  projectId?: string;

  @ApiPropertyOptional({
    description: 'ID del Usuario que crea la tarea (opcional, si se desea cambiar)',
    example: 'a4b3c2d1-4d85-49df-94e5-5c9f9f9bfe1a',
  })
  userId?: string;
}
