import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

const microServiceOptions = {
  transport: Transport.TCP,
  options: {
    host: '127.0.0.1',
    port: 5004,
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    microServiceOptions,
  );

  app.listen().then(() => console.log('Messages service is already listening'));
}

bootstrap();
