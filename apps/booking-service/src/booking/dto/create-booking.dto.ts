import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty({ message: 'Please provide a room ID!' })
  @IsNumber()
  room: number;

  @IsNotEmpty({ message: 'Please provide a user ID!' })
  @IsNumber()
  userId: number;

  @IsNotEmpty({ message: 'Please provide a check-in date!' })
  @IsString() // Use IsString for validation if the date comes as an ISO string
  // @Type(() => Date) // Use this if you are transforming a string to a Date object
  checkIn: string | Date;

  @IsNotEmpty({ message: 'Please provide a check-out date!' })
  @IsString()
  // @Type(() => Date)
  checkOut: string | Date;

  @IsNotEmpty({ message: 'Please provide the guest count!' })
  @IsNumber()
  guestCount: number;

  @IsNotEmpty({ message: 'Please provide the total price!' })
  @IsNumber()
  totalPrice: number;
}
