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
  @IsNumber()
  roomNumber: number;

  @IsNotEmpty({ message: 'Please provide a description!' })
  @IsString()
  description: string;

  @Min(1, { message: 'Minimum capacity is 1!' })
  @IsNotEmpty({ message: 'Please provide a capacity!' })
  @Max(5, { message: 'Maximum capacity is 5!' })
  @IsNumber()
  capacity: number;

  @IsNotEmpty({ message: 'Please provide a price!' })
  @IsNumber()
  regularPrice: number;

  @IsOptional()
  @IsNumber()
  discount?: number;

  @IsOptional()
  @IsString()
  image?: string;
}
