import { Controller, Get, Post, Body, Param, Delete, Put, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    try {
      return this.taskService.createTask(createTaskDto)
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving tasks')
    }
  }

  @Get()
  async getAllTasks() {
    try {
      const tasks = this.taskService.findAllTasks(); // Llama al método correcto para obtener las tareas
      if (!tasks || (await tasks).length === 0) {
        throw new NotFoundException('no hay tareas')
      }
      return tasks
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving tasks')
    }
  }

  @Get(':id')
  async getTaskId(@Param('id') id: string) {
    try {
      return this.taskService.findTaskId(id);
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving task')
    }
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    try {
      return this.taskService.updateTask(id, updateTaskDto);
    } catch (error) {
      throw new InternalServerErrorException('Error al cambiar elementos de la tarea')
    }
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    try {
      return this.taskService.removeTask(id);
    } catch (error) {
      throw new InternalServerErrorException('Error al eliminarl la tarea')
    }
  }
}
