import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from './client/client.module';
import { RoomController } from './room/room.controller';
import { BookingController } from './booking/booking.controller';

// @Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    ClientModule,
  ],
  controllers: [UserController, RoomController, BookingController],
  providers: [],
})
export class AppModule {}
