import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateSettingDto } from './dto/create-setting.dto';
import { firstValueFrom } from 'rxjs';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/types/enums';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Controller('settings')
export class SettingController {
  constructor(
    @Inject('SETTING_CLIENT') private readonly settingClient: ClientProxy,
  ) {}

  /**
   * desc create a setting
   * @route /api/v1/settings
   */
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  create(
    @Body() createSettingDto: CreateSettingDto,
  ): Promise<CreateSettingDto> {
    return firstValueFrom(
      this.settingClient.send({ cmd: 'createSetting' }, createSettingDto),
    );
  }

  /**
   * desc get all rooms
   * @route /api/v1/rooms
   */
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  findAll(): Promise<CreateSettingDto[]> {
    return firstValueFrom(
      this.settingClient.send({ cmd: 'findAllSettings' }, {}),
    );
  }

  /**
   * desc update a setting
   * @route /api/v1/rooms/:id
   */
  @Patch(':id')
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  async updateRoom(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSettingDto: UpdateSettingDto,
  ): Promise<UpdateSettingDto> {
    try {
      return await firstValueFrom(
        this.settingClient.send(
          { cmd: 'updateSetting' },
          { id, updateSettingDto },
        ),
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
