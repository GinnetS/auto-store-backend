import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductsDto } from './dto/query-products.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../../common/roles.decorator';
import { RolesGuard } from '../../common/roles.guard';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  // listado público cacheado
  @UseInterceptors(CacheInterceptor)
  @Get()
  findAll(@Query() query: QueryProductsDto) { return this.service.findAll(query); }

  // detalle público
  @Get(':id')
  findOne(@Param('id') idOrSlug: string) { return this.service.findOne(idOrSlug); }

  // admin-only mutaciones
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() dto: CreateProductDto) { return this.service.create(dto); }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) { return this.service.update(id, dto); }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) { return this.service.remove(id); }
}
