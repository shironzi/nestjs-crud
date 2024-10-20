import { IsAlphanumeric, IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from './tasks.entity';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  title: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  description: string;

  @IsEnum(TaskStatus, {
    message: 'Status must be either OPEN, IN_PROGRESS, or DONE',
  })
  status: TaskStatus;
}
