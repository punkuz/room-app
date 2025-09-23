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
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/types/enums';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('user')
@UseGuards(AuthGuard, RolesGuard)
export class UserController {
  constructor(
    @Inject('USER_CLIENT') private readonly userClient: ClientProxy,
  ) {}

  @Roles(Role.Admin)
  @Get()
  findAll(): Promise<CreateUserDto[]> {
    return lastValueFrom(this.userClient.send({ cmd: 'findAllUsers' }, {}));
  }

  @Roles(...Object.values(Role))
  @Get('/email/:email')
  findByEmail(@Param('email') email: string): Promise<CreateUserDto> {
    return lastValueFrom(
      this.userClient.send({ cmd: 'findUserByEmail' }, email),
    );
  }

  @Roles(...Object.values(Role))
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<CreateUserDto> {
    return lastValueFrom(this.userClient.send({ cmd: 'findUserById' }, id));
  }
}
