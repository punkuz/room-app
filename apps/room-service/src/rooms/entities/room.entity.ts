import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { IsNotEmpty, IsNumber, IsOptional, Max, Min } from 'class-validator';

@Entity()
export class Room extends BaseEntity {
  @Column()
  @IsNotEmpty({ message: 'Please provide a name!' })
  name: string;

  @Column()
  @IsNotEmpty({ message: 'Please provide a type!' })
  type: string;

  @Column({ unique: true })
  @IsNotEmpty({ message: 'Please provide a room number!' })
  roomNumber: string;

  @Column()
  @IsNotEmpty({ message: 'Please provide a description!' })
  description: string;

  @Column()
  @Min(1, { message: 'Minimum capacity is 1!' })
  @IsNotEmpty({ message: 'Please provide a capacity!' })
  @Max(5, { message: 'Maximum capacity is 5!' })
  capacity: number;

  @Column()
  @IsNotEmpty({ message: 'Please provide a price!' })
  @IsNumber()
  regularPrice: number;

  @Column()
  @IsOptional()
  @IsNumber()
  discount?: number;

  @Column()
  @IsOptional()
  image?: string;
}
