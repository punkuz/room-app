import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

@Entity()
export class User extends BaseEntity {
  @Column({ length: 350, unique: true })
  @IsNotEmpty({ message: 'Please enter your username!' })
  username: string;

  @Column({ unique: true })
  @IsEmail({}, { message: 'Please provide a valid email!' })
  email: string;

  @Column({ nullable: true })
  uniqueSlug?: string;

  @Column({ type: 'enum', enum: ['user', 'admin', 'guide'], default: 'user' })
  @IsNotEmpty({ message: 'Please provide a role!' })
  @IsEnum(['user', 'admin', 'guide'], {
    message: "Role must be either 'user' or 'admin' or 'guide'!",
  })
  role: 'user' | 'admin' | 'guide';
}
