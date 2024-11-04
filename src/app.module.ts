import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MqttService } from './mqtt/mqtt.service';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, // Makes ConfigModule available globally without re-importing
  }),],
  providers: [MqttService,AppService],
  controllers: [AppController],
})
export class AppModule {}
