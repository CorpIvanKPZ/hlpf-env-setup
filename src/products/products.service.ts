import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async findAll(query: ProductQueryDto) {
    // 1. Формуємо унікальний ключ для кешу
    const cacheKey = `products:${JSON.stringify(query)}`;

    // 2. Перевіряємо кеш
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) {
      return cached;
    }

    // 3. Запит до БД
    const { page, pageSize, sort, order, categoryId, minPrice, maxPrice, search } = query;

    const qb = this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category');

    if (categoryId) qb.andWhere('category.id = :categoryId', { categoryId });
    if (minPrice !== undefined) qb.andWhere('product.price >= :minPrice', { minPrice });
    if (maxPrice !== undefined) qb.andWhere('product.price <= :maxPrice', { maxPrice });
    if (search) qb.andWhere('product.name ILIKE :search', { search: `%${search}%` });

    qb.orderBy(`product.${sort}`, order.toUpperCase() as 'ASC' | 'DESC');
    qb.skip((page - 1) * pageSize).take(pageSize);

    const [items, total] = await qb.getManyAndCount();
    const result = {
      items,
      meta: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
    };

    // 4. Зберігаємо результат в кеш (TTL 60 секунд)
    await this.cacheManager.set(cacheKey, result, 60_000);

    return result;
  }

  // Метод для очищення кешу
  private async clearProductsCache(): Promise<void> {
    const keys: string[] = await this.cacheManager.store.keys('products:*');
    if (keys.length > 0) {
      await Promise.all(keys.map((key) => this.cacheManager.del(key)));
    }
  }

  async create(dto: CreateProductDto): Promise<Product> {
    const product = this.productRepo.create({
      ...dto,
      category: dto.categoryId ? { id: dto.categoryId } as any : undefined,
    });
    const saved = await this.productRepo.save(product);
    await this.clearProductsCache(); // <-- Інвалідація
    return saved;
  }

  async update(id: number, dto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    // ... логіка оновлення ...
    const saved = await this.productRepo.save(product);
    await this.clearProductsCache(); // <-- Інвалідація
    return saved;
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepo.remove(product);
    await this.clearProductsCache(); // <-- Інвалідація
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!product) throw new NotFoundException(`Product #${id} not found`);
    return product;
  }
}