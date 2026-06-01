import {
  IsOptional,
  IsInt,
  Min,
  Max,
  IsIn,
  IsString,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ProductQueryDto {
  @ApiPropertyOptional({ example: 1, description: 'Номер сторінки', default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ example: 10, description: 'Кількість елементів (max 100)', default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  pageSize?: number = 10;

  @ApiPropertyOptional({ example: 'createdAt', description: 'Поле сортування', enum: ['name', 'price', 'stock', 'createdAt'], default: 'createdAt' })
  @IsOptional()
  @IsIn(['name', 'price', 'stock', 'createdAt'])
  sort?: string = 'createdAt';

  @ApiPropertyOptional({ example: 'desc', description: 'Напрямок сортування', enum: ['asc', 'desc'], default: 'desc' })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc' = 'desc';

  @ApiPropertyOptional({ example: 1, description: 'ID категорії' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  categoryId?: number;

  @ApiPropertyOptional({ example: 100, description: 'Мінімальна ціна' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @ApiPropertyOptional({ example: 1000, description: 'Максимальна ціна' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @ApiPropertyOptional({ example: 'iPhone', description: 'Пошук за назвою' })
  @IsOptional()
  @IsString()
  search?: string;
}