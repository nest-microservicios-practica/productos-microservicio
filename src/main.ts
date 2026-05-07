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
  // no esta por un puerto particular porque esta conectandose como nats, se comunica por mensajes, no por http,
  // entonces no necesita un puerto para escuchar, sino que se conecta a nats y escucha los mensajes que le llegan a través de nats
  // si quiero que escuche por un puerto, tendría que hacer el microservicio hibrido, ejemplo el microservicio de pagos
  // logger.log(`**** MICROSERVICIO PRODUCTOS, Corriendo en el puerto ${envs.port} ****`)
}
bootstrap();
