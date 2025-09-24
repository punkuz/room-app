import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller()
export class BookingController {
  constructor(
    @Inject('BOOKING_CLIENT') private readonly bookingClient: ClientProxy,
  ) {}

  @MessagePattern('createBooking')
  create(@Payload() createBookingDto: CreateBookingDto) {
    return this.bookingClient.send({ cmd: 'createBooking' }, createBookingDto);
  }

  @MessagePattern('findAllBooking')
  findAll() {
    return this.bookingClient.send({ cmd: 'findAllBooking' }, {});
  }

  @MessagePattern('findOneBooking')
  findOne(@Payload() id: number) {
    return this.bookingClient.send({ cmd: 'findOneBooking' }, id);
  }

  @MessagePattern('updateBooking')
  update(@Payload() updateBookingDto: UpdateBookingDto) {
    return this.bookingClient.send({ cmd: 'updateBooking' }, updateBookingDto);
  }

  @MessagePattern('removeBooking')
  remove(@Payload() id: number) {
    return this.bookingClient.send({ cmd: 'removeBooking' }, { id });
  }
}
