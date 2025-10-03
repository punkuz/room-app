import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSettingDto {
  @IsNumber()
  @IsNotEmpty()
  minBookingLength: number;

  @IsNumber()
  @IsNotEmpty()
  maxBookingLength: number;

  @IsNumber()
  @IsNotEmpty()
  minGuestsPerBooking: number;

  @IsNumber()
  @IsNotEmpty()
  maxGuestsPerBooking: number;

  @IsNumber()
  @IsNotEmpty()
  breakfastPrice: number;

  @IsNumber()
  @IsNotEmpty()
  lunchPrice: number;

  @IsNumber()
  @IsNotEmpty()
  dinnerPrice: number;
}
