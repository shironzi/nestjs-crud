import { IsNotEmpty, IsString } from 'class-validator';
export class Login {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
