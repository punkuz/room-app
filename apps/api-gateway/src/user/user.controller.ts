import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dto';
import { lastValueFrom } from 'rxjs';

@Controller('user')
export class UserController {
  constructor(
    @Inject('USER_CLIENT') private readonly userClient: ClientProxy,
  ) {}

  @Get()
  findAll(): Promise<CreateUserDto[]> {
    console.log("test", process.env.RABBITMQ_URL);
    return lastValueFrom(this.userClient.send({ cmd: 'findAllUsers' }, {}));
  }
}
