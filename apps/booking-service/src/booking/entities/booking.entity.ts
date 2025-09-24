import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { IsNotEmpty, IsNumber } from 'class-validator';

@Entity()
export class Booking extends BaseEntity {
  @Column()
  @IsNotEmpty({ message: 'Please provide a room id!' })
  @IsNumber()
  room: number;

  @Column()
  @IsNotEmpty({ message: 'Please provide a user id!' })
  @IsNumber()
  userId: number;

  @Column({ type: 'timestamp' })
  checkIn: Date;

  @Column({ type: 'timestamp' })
  checkOut: Date;

  @Column()
  guestCount: number;

  @Column()
  totalPrice: number;
}
