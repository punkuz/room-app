import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { HttpRpcException } from 'src/exceptions/http.rpc.exception';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
  ) {}
  async create(createRoomDto: CreateRoomDto) {
    try {
      const room = this.roomRepository.create(createRoomDto);
      return await this.roomRepository.save(room);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error creating user';
      throw HttpRpcException.internalServerError(message);
    }
  }

  findAll(): Promise<Room[]> {
    return this.roomRepository.find();
  }

  async findOne(id: number) {
    const room = await this.roomRepository.findOne({
      where: { id },
    });
    if (!room) {
      throw HttpRpcException.notFound('Room not found.');
    }
    return room;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return this.roomRepository.update(id, updateRoomDto);
  }

  remove(id: number) {
    return this.roomRepository.delete(id);
  }
}
