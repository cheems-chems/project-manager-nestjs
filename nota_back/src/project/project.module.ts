import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { Task } from 'src/task/entities/task.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Project, User, Task])],
  controllers: [ProjectController],
  providers: [ProjectService, UserService],
})

export class ProjectModule {}
