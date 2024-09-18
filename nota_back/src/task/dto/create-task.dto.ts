// src/task/dto/create-task.dto.ts
import { IsNotEmpty, IsString, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  dueDate: Date;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  projectId: string; // UUID del proyecto al que pertenece la tarea

  @IsNotEmpty()
  @IsString()
  userId: string; // UUID del usuario asignado a la tarea
}
