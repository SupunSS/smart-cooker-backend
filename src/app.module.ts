import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MqttService } from './mqtt/mqtt.service';
import { OrderModule } from './order/order.module';
import { DeviceModule } from './device/device.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, // Makes ConfigModule available globally without re-importing
  }), OrderModule, DeviceModule, UserModule, DatabaseModule,],
  providers: [MqttService,AppService],
  controllers: [AppController],
})
export class AppModule {}
