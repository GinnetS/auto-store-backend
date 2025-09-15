import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductsDto } from './dto/query-products.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  async create(dto: CreateProductDto) {
    const exists = await this.repo.findOne({ where: [{ slug: dto.slug }] });
    if (exists) throw new ConflictException('Slug already exists');
    const p = this.repo.create(dto as any);
    return this.repo.save(p);
  }

  async findAll(query: QueryProductsDto) {
    const { q, categoryId, brand, model, minPrice, maxPrice, sort, page, limit } = query;

    const qb = this.repo.createQueryBuilder('p')
      .leftJoinAndSelect('p.category', 'c')
      .where('p.isActive = :active', { active: true });

    if (q) qb.andWhere('(p.name ILIKE :q OR p.brand ILIKE :q OR p.model ILIKE :q)', { q: `%${q}%` });
    if (categoryId) qb.andWhere('p.categoryId = :categoryId', { categoryId });
    if (brand) qb.andWhere('p.brand ILIKE :brand', { brand: `%${brand}%` });
    if (model) qb.andWhere('p.model ILIKE :model', { model: `%${model}%` });
    if (minPrice) qb.andWhere('p.price >= :minPrice', { minPrice });
    if (maxPrice) qb.andWhere('p.price <= :maxPrice', { maxPrice });

    switch (sort) {
      case 'price_asc': qb.addOrderBy('p.price', 'ASC'); break;
      case 'price_desc': qb.addOrderBy('p.price', 'DESC'); break;
      default: qb.addOrderBy('p.createdAt', 'DESC');
    }

    const total = await qb.getCount();
    const data = await qb.skip((page - 1) * limit).take(limit).getMany();

    return { data, meta: { total, page, limit, pages: Math.ceil(total / limit) } };
  }

  async findOne(idOrSlug: string) {
    const p = await this.repo.findOne({ where: [{ id: idOrSlug }, { slug: idOrSlug }] as any });
    if (!p) throw new NotFoundException('Product not found');
    return p;
  }

  async update(id: string, dto: UpdateProductDto) {
    const p = await this.findOne(id);
    Object.assign(p, dto);
    return this.repo.save(p);
  }

  async remove(id: string) {
    const p = await this.findOne(id);
    p.isActive = false;
    await this.repo.save(p);
    return { deleted: true };
  }
}
