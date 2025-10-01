import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/types/enums';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { firstValueFrom } from 'rxjs';

@Controller('rooms')
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
  @UseInterceptors(FileInterceptor('image'))
  async createRoom(
    @Body() createRoomDto: CreateRoomDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    try {
      const res = await firstValueFrom<CreateRoomDto>(
        this.roomClient.send(
          { cmd: 'createRoom' },
          { ...createRoomDto, image: image.filename },
        ),
      );
      return res;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
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
  getRoomById(@Param('id', ParseIntPipe) id: number) {
    return this.roomClient.send({ cmd: 'findRoomById' }, id);
  }

  /**
   * desc update a room
   * @route /api/v1/rooms/:id
   */
  @Patch(':id')
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  async updateRoom(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoomDto: UpdateRoomDto,
  ) {
    try {
      return await firstValueFrom<UpdateRoomDto>(
        this.roomClient.send({ cmd: 'updateRoom' }, { id, updateRoomDto }),
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
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
