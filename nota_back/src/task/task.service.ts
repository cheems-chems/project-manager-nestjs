import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description, dueDate, status, projectId, userId } = createTaskDto;

    const project = await this.projectRepository.findOneBy({ id: projectId });
    if (!project) {
      throw new Error('Projecto no encontrado');
    }

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Convert dueDate from string to Date
    const due = new Date(dueDate);

    const newTask = this.taskRepository.create({
      title,
      description,
      dueDate: due,
      status,
      project,
      user,
    });

    return this.taskRepository.save(newTask);
  }
}
