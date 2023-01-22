import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserStatus {
  BLOCK = 'block',
  UNBLOCK = 'unblock',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: ''})
  name: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column()
  register?: Date;

  @Column()
  lastVisit?: Date;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.UNBLOCK,
  })
  status: UserStatus;
}
