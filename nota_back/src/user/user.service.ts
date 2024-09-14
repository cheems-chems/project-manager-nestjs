import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
    const user = await this.userRepository.findOne({ where: { id } });
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
    const user = await this.findOne(id);
    updateUserDto.password && (updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10))
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: string): Promise<string> {
    const user = await this.userRepository.findOne({where: {id}});
    if(!user){ throw new NotFoundException(`Usuario con el ID ${id} no encontrado`)}
    await this.userRepository.remove(user)
    return 'El usuairo ha sido eliminado correctamente '
  }
}
