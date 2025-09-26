import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty({ message: 'Please provide a name!' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Please provide a type!' })
  @IsString()
  type: string;

  @IsNotEmpty({ message: 'Please provide a room number!' })
  @Type(() => Number)
  @IsNumber({}, { message: 'roomNumber must be a number' })
  roomNumber: number;

  @IsNotEmpty({ message: 'Please provide a description!' })
  @IsString()
  description: string;

  @Type(() => Number)
  @IsNotEmpty({ message: 'Please provide a capacity!' })
  @IsNumber({}, { message: 'Capacity must be a number' })
  @Min(1, { message: 'Minimum capacity is 1!' })
  @Max(5, { message: 'Maximum capacity is 5!' })
  capacity: number;

  @IsNotEmpty({ message: 'Please provide a price!' })
  @Type(() => Number)
  @IsNumber({}, { message: 'Price must be a number' })
  regularPrice: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Discount must be a number' })
  discount?: number;

  @IsOptional()
  @IsString()
  image?: string;
}
