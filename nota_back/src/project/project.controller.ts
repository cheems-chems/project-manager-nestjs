import { Controller, Get, Post, Body, Put, Delete, Request, Param, HttpException } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { User } from 'src/user/entities/user.entity';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create(@Body() createProjectoDto: CreateProjectDto): Promise<Project>{
    return this.projectService.createProject(createProjectoDto)
  }

  @Get()
  async findAll(@Request() req: any){
    const user = req.user;
    return this.projectService.AllProyects(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req: any){
    const user = req.user;
    return this.projectService.ProjectId(id, user)
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() UpdateProjectDto: UpdateProjectDto,
    @Request() req: any,
  ){
    const user = req.user;
    return this.projectService.updateProject(id, UpdateProjectDto, user)
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req: any) {
    try {
        await this.projectService.deleteProject(id, req.user);
        return { message: 'Proyecto eliminado con éxito' };
    } catch (error) {
        throw new HttpException(error.message, error.status);
    }
}

  @Get(':id/tasks')
  async getProjectTasks(@Param('id')id: string, @Request() req: any){
    const user = req.user;
    return this.projectService.ProjectTasks(id, user) 
  }

} 
