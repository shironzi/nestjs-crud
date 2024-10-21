import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './dto/user.entity';
import { Repository } from 'typeorm';
import { CreateUser } from './dto/create-user.dto';
import { Login } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

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
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException(`User with ${username} not found`);
    }

    return user;
  }

  async createUser(createUserDto: CreateUser): Promise<User> {
    const { username, email, password } = createUserDto;

    const usernameTaken = await this.userRepository.findOne({
      where: { username },
    });

    const emailTaken = await this.userRepository.findOne({
      where: { email },
    });

    if (usernameTaken) {
      throw new ConflictException(`Username ${username} is already been taken`);
    }

    if (emailTaken) {
      throw new ConflictException(`Email ${email} is already been taken`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
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

    if (!user) {
      throw new UnauthorizedException(`Username or Password is invalid`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      throw new UnauthorizedException('Username or Password is invalid');
    }

    return user;
  }
}
