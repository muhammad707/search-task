import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { User } from './user.entity';


@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  address: string;

  @ManyToMany(type => User, user => user.addresses)
  user: User
}