import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, UseGuards, Query } from '@nestjs/common'; // <-- додав Query
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto'; // <-- імпорт DTO
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@ApiTags('Products')
@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Отримати продукти з пагінацією',
    description: 'Підтримує пагінацію, сортування, фільтрацію та пошук.' 
  })
  @ApiResponse({ status: 200, description: 'Список продуктів з мета-інформацією' })
  findAll(@Query() query: ProductQueryDto) { // <-- оновили аргумент
    return this.productsService.findAll(query);
  }

  // ... решта методів (findOne, create, update, remove) залишаються без змін
  
  @Get(':id')
  @ApiOperation({ summary: 'Отримати продукт за ID' })
  @ApiResponse({ status: 200, description: 'Продукт знайдено' })
  @ApiResponse({ status: 404, description: 'Продукт не знайдено' })
  findOne(@Param('id', ParseIntPipe) id: number) { return this.productsService.findOne(id); }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Створити продукт (тільки для admin)' })
  @ApiResponse({ status: 201, description: 'Продукт створено' })
  create(@Body() dto: CreateProductDto) { return this.productsService.create(dto); }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Оновити продукт' })
  @ApiResponse({ status: 200, description: 'Продукт оновлено' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto) { return this.productsService.update(id, dto); }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Видалити продукт' })
  @ApiResponse({ status: 200, description: 'Продукт видалено' })
  remove(@Param('id', ParseIntPipe) id: number) { return this.productsService.remove(id); }
}