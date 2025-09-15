import { Category } from '../../categories/entities/category.entity';
export declare class Product {
    id: string;
    name: string;
    slug: string;
    description?: string;
    brand: string;
    model: string;
    price: string;
    stock: number;
    images?: string[];
    isActive: boolean;
    category: Category;
    categoryId: string;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=product.entity.d.ts.map