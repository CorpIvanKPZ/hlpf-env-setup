import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'; // Імпорти
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@ApiTags('Products') // Групує ендпоінти у Swagger
@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Отримати всі продукти' })
  @ApiResponse({ status: 200, description: 'Список продуктів' })
  findAll() { return this.productsService.findAll(); }

  @Get(':id')
  @ApiOperation({ summary: 'Отримати продукт за ID' })
  @ApiResponse({ status: 200, description: 'Продукт знайдено' })
  @ApiResponse({ status: 404, description: 'Продукт не знайдено' })
  findOne(@Param('id', ParseIntPipe) id: number) { return this.productsService.findOne(id); }

  @Post()
  @ApiBearerAuth() // Додає кнопку авторизації (замочок)
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