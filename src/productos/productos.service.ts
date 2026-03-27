import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PrismaService } from 'src/prisma.service';
import { PaginationDto } from 'src/common/dto';
import { throwError } from 'rxjs';

@Injectable()
export class ProductosService {

  constructor(private prisma: PrismaService) {}

  async create(createProductoDto: CreateProductoDto) {
    const producto = await this.prisma.producto.create({
      data: createProductoDto
    });
    return producto;
  }

  async findAll(paginationDto: PaginationDto) {
    const {limit, page} = paginationDto;
    
    const skip = (page! - 1) * limit!;
    const total = await this.prisma.producto.count({
      where: {
        disponible: true
      }
    });
    const lastPage = Math.ceil(total / limit!);

    const productos = await this.prisma.producto.findMany({
      skip: skip,
      take: limit,
      where: {
        disponible: true
      }
    });
    return {
      data: productos,
      meta: {
        total,
        lastPage,
        page: page
      }
    };
  }

  async findOne(id: number) {
    const producto = await this.prisma.producto.findUnique({
      where: {
        id: id,
        disponible: true
      }
    })
    if (!producto) {
      throw new NotFoundException(`Producto ${id} no encontrado`);
    }
    return producto;
  }

  async update(updateProductoDto: UpdateProductoDto) {
    const { id, ...data } = updateProductoDto;
    await this.findOne(id);
    const producto = await this.prisma.producto.update({
      data: data,
      where: {id}
    })
    return producto;
  }

  async remove(id: number) {
    await this.findOne(id);
    // return await this.prisma.producto.delete({
    //   where: {id}
    // })
    return await this.prisma.producto.update({
      data: {
        disponible: false
      },
      where: {id}
    })

  }
}
