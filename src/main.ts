import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('main.ts');
  console.log(envs.natsServers)
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options:{
        servers: envs.natsServers, /// natsServers es un array
      }
    },
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted:
        true,
    })
  );
  await app.listen();
  logger.log(`**** MICROSERVICIO PRODUCTOS, Corriendo en el puerto ${envs.port} ****`)
}
bootstrap();
