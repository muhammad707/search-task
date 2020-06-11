import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';


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

}