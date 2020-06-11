import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';


@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  address: string;

  @ManyToOne(type => User, user => user.addresses)
  user: User
}