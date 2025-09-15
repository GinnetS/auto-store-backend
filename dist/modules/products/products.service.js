"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
let ProductsService = class ProductsService {
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        const exists = await this.repo.findOne({ where: [{ slug: dto.slug }] });
        if (exists)
            throw new common_1.ConflictException('Slug already exists');
        const p = this.repo.create(dto);
        return this.repo.save(p);
    }
    async findAll(query) {
        const { q, categoryId, brand, model, minPrice, maxPrice, sort, page, limit } = query;
        const qb = this.repo.createQueryBuilder('p')
            .leftJoinAndSelect('p.category', 'c')
            .where('p.isActive = :active', { active: true });
        if (q)
            qb.andWhere('(p.name ILIKE :q OR p.brand ILIKE :q OR p.model ILIKE :q)', { q: `%${q}%` });
        if (categoryId)
            qb.andWhere('p.categoryId = :categoryId', { categoryId });
        if (brand)
            qb.andWhere('p.brand ILIKE :brand', { brand: `%${brand}%` });
        if (model)
            qb.andWhere('p.model ILIKE :model', { model: `%${model}%` });
        if (minPrice)
            qb.andWhere('p.price >= :minPrice', { minPrice });
        if (maxPrice)
            qb.andWhere('p.price <= :maxPrice', { maxPrice });
        switch (sort) {
            case 'price_asc':
                qb.addOrderBy('p.price', 'ASC');
                break;
            case 'price_desc':
                qb.addOrderBy('p.price', 'DESC');
                break;
            default: qb.addOrderBy('p.createdAt', 'DESC');
        }
        const total = await qb.getCount();
        const data = await qb.skip((page - 1) * limit).take(limit).getMany();
        return { data, meta: { total, page, limit, pages: Math.ceil(total / limit) } };
    }
    async findOne(idOrSlug) {
        const p = await this.repo.findOne({ where: [{ id: idOrSlug }, { slug: idOrSlug }] });
        if (!p)
            throw new common_1.NotFoundException('Product not found');
        return p;
    }
    async update(id, dto) {
        const p = await this.findOne(id);
        Object.assign(p, dto);
        return this.repo.save(p);
    }
    async remove(id) {
        const p = await this.findOne(id);
        p.isActive = false;
        await this.repo.save(p);
        return { deleted: true };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductsService);
//# sourceMappingURL=products.service.js.map