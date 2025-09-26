import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Controller()
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @MessagePattern({ cmd: 'createRoom' })
  create(@Payload() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @MessagePattern({ cmd: 'findAllRooms' })
  findAll(): Promise<CreateRoomDto[]> {
    return this.roomsService.findAll();
  }

  @MessagePattern({ cmd: 'findRoomById' })
  findOne(@Payload() id: number) {
    return this.roomsService.findOne(id);
  }

  @MessagePattern({ cmd: 'updateRoom' })
  update(@Payload() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(updateRoomDto.id, updateRoomDto);
  }

  @MessagePattern({ cmd: 'removeRoom' })
  remove(@Payload(ParseIntPipe) id: number) {
    return this.roomsService.remove(id);
  }
}
