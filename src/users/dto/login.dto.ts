import { Column, Entity } from 'typeorm';

@Entity()
export class Login {
  @Column()
  username: string;

  @Column()
  password: string;
}
