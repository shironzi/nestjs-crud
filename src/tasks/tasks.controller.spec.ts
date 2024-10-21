import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
  let controller: TasksController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: TasksService;

  // Mock the TasksService methods
  const mockTasksService = {
    getTasks: jest.fn(),
    getTaskById: jest.fn(),
    createTask: jest.fn(),
    deleteTask: jest.fn(),
    updateTaskStatus: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,  // Provide the TasksService mock
          useValue: mockTasksService,  // Use the mock implementation
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
