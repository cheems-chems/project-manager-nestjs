import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Project } from 'src/project/entities/project.entity';
import { Task } from 'src/task/entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Project, Task]), // Incluye todos los repositorios necesarios
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], // Exporta el servicio si es necesario en otros módulos
})
export class UserModule {}