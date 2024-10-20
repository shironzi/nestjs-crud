import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './dto/user.entity';
import { Repository } from 'typeorm';
import { CreateUser } from './dto/create-user.dto';
import { Login } from './dto/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserByUsername(username: string): Promise<User> {
    return await this.userRepository.findOneBy({ username });
  }

  async CreateUser(createUserDto: CreateUser): Promise<User> {
    const { username, email, password } = createUserDto;

    const user = this.userRepository.create({
      username,
      email,
      password,
    });

    return await this.userRepository.save(user);
  }

  async login(loginDto: Login): Promise<User> {
    const { username, password } = loginDto;

    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    });

    if (user.password !== password) {
      throw new Error('Invalid Username or password');
    }

    return user;
  }
}
