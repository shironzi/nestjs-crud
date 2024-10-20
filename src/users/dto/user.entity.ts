import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum userRole {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: userRole;
}
