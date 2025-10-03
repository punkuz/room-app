import { Injectable } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { Setting } from './entities/setting.entity';
import { Repository } from 'typeorm';
import { HttpRpcException } from 'src/exceptions/http.rpc.exception';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting) private settingRepository: Repository<Setting>,
  ) {}
  create(createSettingDto: CreateSettingDto) {
    try {
      const setting = this.settingRepository.create(createSettingDto);
      return this.settingRepository.save(setting);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error creating Setting';
      throw HttpRpcException.internalServerError(message);
    }
  }

  async findAll() {
    try {
      const setting = await this.settingRepository.find();
      return setting[0];
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Setting data not found';
      throw HttpRpcException.internalServerError(message);
    }
  }

  findOne(id: number) {
    try {
      return this.settingRepository.findOne({ where: { id } });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Setting not found';
      throw HttpRpcException.notFound(message);
    }
  }

  update(id: number, updateSettingDto: UpdateSettingDto) {
    try {
      return this.settingRepository.update(id, updateSettingDto);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Setting not found';
      throw HttpRpcException.notFound(message);
    }
  }

  remove(id: number) {
    try {
      return this.settingRepository.delete(id);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Setting not found';
      throw HttpRpcException.notFound(message);
    }
  }
}
