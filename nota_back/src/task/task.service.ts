import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { Project } from 'src/project/entities/project.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) { }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { projectId, userId, title, description, dueDate, status } = createTaskDto;

    const project = await this.projectRepository.findOne({ where: { id: projectId } });
    if (!project) throw new NotFoundException('Project not found');

    const task = this.taskRepository.create({
      title,
      description,
      dueDate,
      status,
      project,
      user: { id: userId }
    });

    return this.taskRepository.save(task);
  }

  async findAllTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findTaskId(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ 
      where: { id: id }, 
      relations: ['project', 'user']});
    if (!task) throw new NotFoundException(`Tarea no encontrada`);
    return task;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findTaskId(id);
    Object.assign(task, updateTaskDto);
    return this.taskRepository.save(task)
  }

  async removeTask(id: string) {
    const task = await this.findTaskId(id);
    return this.taskRepository.remove(task)
  }
}
