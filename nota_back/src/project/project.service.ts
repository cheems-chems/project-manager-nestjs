import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Task } from 'src/task/entities/task.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly userService: UserService,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ){}
  // Crear un nuevo proyecto
  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const { name, description, startDate, endDate, userId } = createProjectDto;

    const user = await this.userService.findOne( userId );
    if (!user) {
      throw new Error('User not found');
    }

    // Convert startDate and endDate from string to Date
    const start = new Date(startDate);
    const end = new Date(endDate);

    const newProject = this.projectRepository.create({
      name,
      description,
      startDate: start,
      endDate: end,
      user,
    });

    return this.projectRepository.save(newProject);
  }

  // Obtoner todos los proyectos de un usurio
  async AllProyects(user: User): Promise<Project[]>{
    return this.projectRepository.find({ where: { user}})
  }

  // obtiner un proyecto por su ID y Usuario
  async ProjectId(id: string, user: User):Promise<Project> {
    const project = await this.projectRepository.findOne({ where: {id, user}})
    if (!project) {
      throw new NotFoundException('Projecto no encontrado')
    }
    return project
  }

  // Actualizar un proyecto por su ID
  async updateProject(id: string, updateProjectDto: UpdateProjectDto, user: User): Promise<Project>{
    const project = await this.ProjectId(id, user);
    const { name, description, endDate } = updateProjectDto;
    project.name = name;
    project.description = description;
    project.endDate = endDate;
    return this.projectRepository.save(project)
  }

  // Eliminar un proyecto por su ID 
  async deleteProejct(id: string, user:User){
    const project = await this.ProjectId(id, user);
    await this.projectRepository.remove(project)
  }
  // Obtener las tareas de un proyecto específico
  async ProjectTasks(id: string, user: User): Promise<Task[]>{
     const project = await this.ProjectId(id, user);
     return this.taskRepository.find({ where: {project}})
  }
}
