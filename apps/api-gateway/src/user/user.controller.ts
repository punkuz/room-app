import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  constructor(
    @Inject('USER_CLIENT') private readonly userClient: ClientProxy,
  ) {}
  //signup
  @Post('signup')
  signup(@Body() createUserDto: any) {
    // Handle user signup
    return this.userClient.send({ cmd: 'createUser' }, createUserDto);
  }

  @Get()
  findAll() {
    console.log('userClient');
    return this.userClient.send({ cmd: 'findAllUsers' }, {});
  }
}
