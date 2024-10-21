import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  ConflictException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserRole } from './dto/user.entity';
import { CreateUser } from './dto/create-user.dto';
import { Login } from './dto/login.dto';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  logger: any;
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.getUsers();
  }

  @Get(':username')
  @Roles(UserRole.ADMIN)
  async getUserByUsername(@Param('id') username: string): Promise<User> {
    return await this.usersService.getUserByUsername(username);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUser): Promise<User> {
    try {
      this.logger.log('Registering new user');
      return await this.usersService.createUser(createUserDto);
    } catch (error) {
      this.logger.error('Error registering user', error);
      throw new ConflictException('User registration failed');
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: Login): Promise<User> {
    try {
      this.logger.log('Logging in user');
      return await this.usersService.login(loginDto);
    } catch (error) {
      this.logger.log('Error logging in user', error);
      throw new ConflictException('User login is failed');
    }
  }
}
