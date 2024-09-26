import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'
import { Task } from 'src/task/entities/task.entity';
import { Project } from 'src/project/entities/project.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    // @InjectRepository(Task)
    // private readonly taskRepository: Repository<Task>,
    // @InjectRepository(Project)
    // private readonly projectRepository: Repository<Project>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const { name, email, password } = createUserDto;

    const { exists, message } = await this.findEmail(email)

    exists && (() => { throw new ConflictException(message); })();

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);
    const {password: _, ...result} = savedUser;
    return result;
  }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.userRepository.find();
    return users.map(({ password, ...user }) => user)
  }

  async findOne(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findOne({ 
      where: { id },
      relations: [ 'projects' ]
    });
    if (!user) throw new NotFoundException(`Usuario con ID ${id} no encontrado`);

    const { password, ...result } = user;
    return result;
  }

  async findEmail(email: string): Promise<{ exists: boolean, message: string, user?: User }> {
    const user = await this.userRepository.findOne({ where: { email } })
    return user
      ? { exists: true, message: 'Este correo ya esta registrado :c', user }
      : { exists: false, message: 'este corrego no esta registrado' }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { email, password, ...otherUpdates } = updateUserDto;

    const user = await this.userRepository.findOne({ where: { id }});
    if(!user){
      throw new NotFoundException(`Usuario por el id no encontrado`);
    }

    //Verificar si el email ya está en uso por otro usuario
    if(email && email !== user.email){
      const emailInUse = await this.userRepository.findOne({ where: { email}});
      if (emailInUse) {
        throw new BadRequestException('Correo electronico ya esta en uso por otro usuario')
      }
    }

    //verificar la contraseña actual
    if(password){
      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch){
        throw new BadRequestException('La contraseña actual es incorrecta')
      }
      //Hashear la nueva contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    // Actualizar otros datos del usuario
    Object.assign(user, otherUpdates, email && { email });
    return this.userRepository.save(user)
  }

  async remove(id: string): Promise<{message: string}> {
    const user = await this.userRepository.findOneBy({ id: id });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    await this.userRepository.remove(user);

    return { message: `Usuario con ID ${id} eliminado correctamente` };
  }
}
