import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { TaskModule } from 'src/task/task.module';
import { Task } from 'src/task/entities/task.entity';
import { Project } from 'src/project/entities/project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Task, Project]),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}