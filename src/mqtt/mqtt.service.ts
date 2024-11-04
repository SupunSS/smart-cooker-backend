
import { Injectable, OnModuleInit, OnModuleDestroy,} from '@nestjs/common';
import { connect, MqttClient } from 'mqtt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class MqttService implements OnModuleInit, OnModuleDestroy {
  private client: MqttClient;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    this.connectToBroker();
  }

  private connectToBroker() {

    // Retrieve MQTT configuration from environment variables
    const brokerUrl = this.configService.get<string>('MQTT_BROKER_URL');
    const username = this.configService.get<string>('MQTT_USERNAME');
    const password = this.configService.get<string>('MQTT_PASSWORD');

    this.client = connect(brokerUrl, {
      username,
      password,
    });
    
    // Set up event listeners
    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
    });

    this.client.on('error', (error) => {
      console.error('MQTT connection error:', error);
    });

    // Optional: Handle incoming messages
    this.client.on('message', (topic, message) => {
      console.log(`Received message on ${topic}:`, message.toString());
    });
  }

  // Publish a message to a topic
  publish(topic: string, message: string) {
    this.client.publish(topic, message, { qos: 0 }, (error) => {
      if (error) {
        console.error('Error publishing message:', error);
      } else {
        console.log(`Message published to ${topic}`);
      }
    });
  }

  // Subscribe to a topic
  subscribe(topic: string) {
    this.client.subscribe(topic, { qos: 0 }, (error) => {
      if (error) {
        console.error(`Failed to subscribe to ${topic}:`, error);
      } else {
        console.log(`Subscribed to ${topic}`);
      }
    });
  }

  onModuleDestroy() {
    if (this.client) {
      this.client.end();
    }
  }
  
}
