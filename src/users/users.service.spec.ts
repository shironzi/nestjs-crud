import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './dto/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let repository: Repository<User>;

  // Mock the repository methods
  const mockUserRepository = {
    find: jest.fn(), // Mock implementation of the find method
    findOneBy: jest.fn(), // Mock implementation of the findOneBy method
    create: jest.fn(), // Mock implementation of the create method
    save: jest.fn(), // Mock implementation of the save method
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User), // Provide the User repository token
          useValue: mockUserRepository, // Use the mock repository
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
