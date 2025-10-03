import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Controller()
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @MessagePattern({ cmd: 'createSetting' })
  create(@Payload() createSettingDto: CreateSettingDto) {
    return this.settingsService.create(createSettingDto);
  }

  @MessagePattern({ cmd: 'findAllSettings' })
  findAll() {
    return this.settingsService.findAll();
  }

  @MessagePattern({ cmd: 'findOneSetting' })
  findOne(@Payload() id: number) {
    return this.settingsService.findOne(id);
  }

  @MessagePattern({ cmd: 'updateSetting' })
  update(
    @Payload() payload: { id: number; updateSettingDto: UpdateSettingDto },
  ) {
    return this.settingsService.update(payload.id, payload.updateSettingDto);
  }

  @MessagePattern({ cmd: 'removeSetting' })
  remove(@Payload() id: number) {
    return this.settingsService.remove(id);
  }
}
