import { Module } from '@nestjs/common';
import { RoomsModule } from './rooms/rooms.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@room/db';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    RoomsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
