import { firstValueFrom } from 'rxjs';
import * as bcrypt from 'bcryptjs';

import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from 'src/user/dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('USER_CLIENT') private readonly userClient: ClientProxy,
  ) {}
  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    // 1) Check if email and password exist
    if (!email || !password) {
      throw new BadRequestException('Please provide email and password!');
    }
    // 2) Check if user exists && password is correct
    const user: CreateUserDto = await firstValueFrom(
      this.userClient.send({ cmd: 'findUserByEmail' }, { email }),
    );

    if (!user || !(await this.correctPassword(password, user.password))) {
      throw new BadRequestException('Incorrect email or password');
    }

    //generate JWT toke
    const access_token = await this.generateToken(user);

    //update last login
    await firstValueFrom(
      this.userClient.send(
        { cmd: 'updateUser' },
        { id: user.id, lastLogin: new Date() },
      ),
    );
    user.password = '';
    return {
      access_token,
      user,
    };
  }

  async signup(createUserDto: CreateUserDto) {
    try {
      const user: CreateUserDto = await firstValueFrom(
        this.userClient.send({ cmd: 'createUser' }, createUserDto),
      );
      user.password = '';
      //generate JWT token
      const access_token = await this.jwtService.signAsync(user);
      return {
        access_token,
        user,
      };
    } catch (error) {
      throw new BadRequestException(error?.message || 'Error creating user');
    }
  }

  async generateToken(user: CreateUserDto) {
    try {
      const payload = {
        username: user.username,
        sub: user.id,
        role: user.role,
      };
      return await this.jwtService.signAsync(payload);
    } catch (error) {
      throw new BadRequestException(error?.message || 'Error generating token');
    }
  }
  async correctPassword(
    candidatePassword: string,
    userPassword: string,
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(candidatePassword, userPassword);
    } catch (error) {
      throw new BadRequestException(
        error?.message || 'Error comparing passwords',
      );
    }
  }
}
