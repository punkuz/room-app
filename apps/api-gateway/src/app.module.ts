import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from './client/client.module';
import { BookingController } from './booking/booking.controller';
import { RoomModule } from './room/room.module';
import { SettingController } from './setting/setting.controller';

// @Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    ClientModule,
    RoomModule,
  ],
  controllers: [UserController, BookingController, SettingController],
  providers: [],
})
export class AppModule {}
