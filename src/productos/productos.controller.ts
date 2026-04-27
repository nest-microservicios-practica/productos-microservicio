import { Controller, ParseIntPipe } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  //! le coloco el prefijo producto_ para que me sea mas facil a mi entenderlo, no es estandar, es mas puede que se vea mal
  
  // @Post()
  //! IMPORTANTE MessagePattern escucha lo que envie el otro microservicio, y los parametros que envie el microservicio A  debe ser igual a lo que espera el microservicio 'B'
  // el POST SE COMENTA PORQUE NO SE NECESITA para comunicacion entre microservicios al 100%, se puede dejar si se desea que sea hibrido y no solo microservicio
  @MessagePattern({ cmd: 'crear_producto' })
  // la data no se recibe del body si no del payload por ser microservicio https://docs.nestjs.com/microservices/basics
  create(@Payload() createProductoDto: CreateProductoDto) {
    return this.productosService.create(createProductoDto);
  }

  // @Get()
  // el GET SE COMENTA PORQUE NO SE NECESITA para comunicacion entre microservicios al 100%, se puede dejar si se desea que sea hibrido y no solo microservicio
  @MessagePattern({ cmd: 'obtener_productos' })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.productosService.findAll(paginationDto);
  }

  // @Get(':id')
  // el GET SE COMENTA PORQUE NO SE NECESITA para comunicacion entre microservicios al 100%, se puede dejar si se desea que sea hibrido y no solo microservicio
  @MessagePattern({ cmd: 'obtener_producto_por_id' })
  // la data no se recibe del Param si no del payload por ser microservicio https://docs.nestjs.com/microservices/basics. aqui se dice que del payload me de solo el id. nada mas
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.productosService.findOne(id);
  }

  // @Patch(':id')
  // el Patch SE COMENTA PORQUE NO SE NECESITA para comunicacion entre microservicios al 100%, se puede dejar si se desea que sea hibrido y no solo microservicio
  @MessagePattern({ cmd: 'actualizar_producto' })
  // la data no se recibe del body si no del payload por ser microservicio https://docs.nestjs.com/microservices/basics
  update(@Payload() updateProductoDto: UpdateProductoDto) {
    return this.productosService.update(updateProductoDto);
  }

  // @Delete(':id')
  // el Delete SE COMENTA PORQUE NO SE NECESITA para comunicacion entre microservicios al 100%, se puede dejar si se desea que sea hibrido y no solo microservicio
  @MessagePattern({ cmd: 'eliminar_producto' })
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.productosService.remove(id);
  }


  @MessagePattern({ cmd: 'validar_productos_por_ids' })
  validarProducto(@Payload() ids: number[]) {
    // Aquí puedes agregar la lógica de validación que necesites
    return this.productosService.validarProductosPorIds(ids);
  }
}
