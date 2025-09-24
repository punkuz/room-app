import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/types/enums';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('room')
export class RoomController {
  constructor(
    @Inject('ROOM_CLIENT') private readonly roomClient: ClientProxy,
  ) {}
  /**
   * desc create a room
   * @route /api/v1/rooms
   */
  @Post()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  createRoom(@Body() createRoomDto: CreateRoomDto) {
    console.log(createRoomDto);
    return this.roomClient.send({ cmd: 'createRoom' }, createRoomDto);
  }
  /**
   * desc get all rooms
   * @route /api/v1/rooms
   */
  @Get()
  getAllRooms() {
    return this.roomClient.send({ cmd: 'findAllRooms' }, {});
  }

  /**
   * desc get a room by id
   * @route /api/v1/rooms/:id
   */
  @Get(':id')
  getRoomById() {
    return this.roomClient.send({ cmd: 'findRoomById' }, {});
  }

  /**
   * desc update a room
   * @route /api/v1/rooms/:id
   */
  @Patch(':id')
  updateRoom(@Param('id') id: number, updateRoomDto: UpdateRoomDto) {
    return this.roomClient.send({ cmd: 'updateRoom' }, { id, updateRoomDto });
  }

  /**
   * desc delete a room
   * @route /api/v1/rooms/:id
   */
  @Delete(':id')
  deleteRoom(@Param('id') id: number) {
    return this.roomClient.send({ cmd: 'removeRoom' }, id);
  }
}
