import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { IsNumber } from 'class-validator';

@Entity()
export class Setting extends BaseEntity {
  @Column()
  @IsNumber()
  minBookingLength: number;

  @Column()
  @IsNumber()
  maxBookingLength: number;

  @Column()
  @IsNumber()
  minGuestsPerBooking: number;

  @Column()
  @IsNumber()
  maxGuestsPerBooking: number;

  @Column()
  @IsNumber()
  breakfastPrice: number;

  @Column()
  @IsNumber()
  lunchPrice: number;

  @Column()
  @IsNumber()
  dinnerPrice: number;
}
