import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserStatus {
  BLOCK = 'block',
  UNBLOCK = 'unblock',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  register: Date;

  @Column()
  lastVisit: Date;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.UNBLOCK,
  })
  status: UserStatus;
}
