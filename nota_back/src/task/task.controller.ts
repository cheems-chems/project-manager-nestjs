import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto){
    return this.taskService.createTask(createTaskDto)
  }

  @Get()
  async getAllTasks() {
    return this.taskService.findAllTasks(); // Llama al método correcto para obtener las tareas
  }

  @Get(':id')
  async getTaskId(@Param('id') id: string){
    return this.taskService.findTaskId(id);
  }

  @Put(':id')
  async updateTask(@Param('id')id: string, @Body() updateTaskDto: UpdateTaskDto){
    return this.taskService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string){
    return this.taskService.removeTask(id);
  }
}
