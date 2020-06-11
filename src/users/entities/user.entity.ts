import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Address } from './address.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  fullname: string;

  @Column()
  department: string;

  @Column()
  position: string

  @OneToMany(type => Address, address => address.user)
  addresses: Address[]

}