import { Module } from '@nestjs/common';
import { ProductosModule } from './productos/productos.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './config';


@Module({
  imports: [
    // ConfigModule.forRoot({
    //   validate: (config) => envSchema.parse(config), // Lanza error si falla
    //   isGlobal: true,
    // }),
    ProductosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
