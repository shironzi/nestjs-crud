import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum userRole {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
}

@Entity()
export class CreateUser {
  @PrimaryGeneratedColumn()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: userRole;
}
