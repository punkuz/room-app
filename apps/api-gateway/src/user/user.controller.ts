import {
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dto';
import { lastValueFrom } from 'rxjs';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(
    @Inject('USER_CLIENT') private readonly userClient: ClientProxy,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll(): Promise<CreateUserDto[]> {
    return lastValueFrom(this.userClient.send({ cmd: 'findAllUsers' }, {}));
  }

  @UseGuards(AuthGuard)
  @Get('/email/:email')
  findByEmail(@Param('email') email: string): Promise<CreateUserDto> {
    return lastValueFrom(
      this.userClient.send({ cmd: 'findUserByEmail' }, email),
    );
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<CreateUserDto> {
    return lastValueFrom(this.userClient.send({ cmd: 'findUserById' }, id));
  }
}
