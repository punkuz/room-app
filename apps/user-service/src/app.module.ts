import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@room/db';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // TypeOrmModule.forRootAsync({
    //   // useFactory() {
    //   //   return {
    //   //     type: 'postgres',
    //   //     host: process.env.DB_HOST,
    //   //     port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
    //   //     username: process.env.DB_USERNAME,
    //   //     password: process.env.DB_PASSWORD,
    //   //     database: process.env.DB_NAME,
    //   //     entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   //     // autoLoadEntities: true,
    //   //     synchronize: process.env.NODE_ENV !== 'production',
    //   //     // logging: true,
    //   //     // dropSchema: true,
    //   //   };
    //   // },
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => ({
    //     type: 'postgres',
    //     host: config.get('DB_HOST'),
    //     port: config.get('DB_PORT') ? +config.get('DB_PORT') : 5432,
    //     username: config.get('DB_USERNAME'),
    //     password: config.get('DB_PASSWORD'),
    //     database: config.get('DB_NAME'),
    //     entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //     // autoLoadEntities: true,
    //     synchronize: config.get('NODE_ENV') !== 'production',
    //     // logging: true,
    //     // dropSchema: true,
    //   }),
    // }),
    DatabaseModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    console.log('AppModule initialized');
    process.on('uncaughtException', (err) => {
      console.error('Uncaught Exception:', err);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason);
      process.exit(1);
    });
  }
}
