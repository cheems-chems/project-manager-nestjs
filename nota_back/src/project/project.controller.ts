import { Controller, Get, Post, Body, Put, Delete, Request, Param, HttpException, InternalServerErrorException, UseGuards} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('Project')
@ApiBearerAuth()
@Controller('project')
@UseGuards(AuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create(@Body() createProjectoDto: CreateProjectDto): Promise<Project>{
    try{
      return this.projectService.createProject(createProjectoDto)
    }catch(error){
      throw new InternalServerErrorException('Error al crear el porjecto: ', error.message)
    }
  }

  @Get()
  async findAll(@Request() req: any){
    try {
      const user = req.user;
      return this.projectService.AllProyects(user);
    } catch (error) {
      throw new InternalServerErrorException('Error al encontrar los porjectos: ', error.message)
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req: any){
    try {
      const user = req.user;
      return this.projectService.ProjectId(id, user)
    } catch (error) {
      throw new InternalServerErrorException('Error al encontrar el projecto: ', error.message)
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() UpdateProjectDto: UpdateProjectDto,
    @Request() req: any,
  ){
    try {
      const user = req.user;
      return this.projectService.updateProject(id, UpdateProjectDto, user)
    } catch (error) {
      throw new InternalServerErrorException('Error al cambiar el projecto: ', error.message)
    }
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
    try {
      const user = req.user;
      return this.projectService.ProjectTasks(id, user) 
    } catch (error) {
      throw new InternalServerErrorException('Error al encontrar el projecto y las tareas: ', error.message)
    }
  }

} 
