import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-producto.dto';
import { IsNumber, IsPositive } from 'class-validator';

// recordemos que a esto lo llama otro microservicio no un frontend o algo asi
export class UpdateProductoDto extends PartialType(CreateProductoDto) {
    @IsNumber()
    @IsPositive()
    id: number;
}
