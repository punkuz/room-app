import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

@Entity()
export class Booking extends BaseEntity {
  @Column()
  @IsNotEmpty({ message: 'Please provide a room id!' })
  @IsNumber()
  roomId: number;

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
  @IsOptional()
  breafastPrice: number;

  @Column()
  @IsOptional()
  hasBreakfast: boolean;

  @Column()
  @IsOptional()
  dinnerPrice: number;

  @Column()
  @IsEnum(['paid', 'unpaid', 'cancelled'])
  @IsNotEmpty({ message: 'Please provide a payment status!' })
  paymentStatus: 'paid' | 'unpaid' | 'cancelled';

  @Column()
  @IsOptional()
  checkInPrice: number;

  @Column()
  @IsOptional()
  hasCheckIn: boolean;

  @Column()
  totalPrice: number;
}
