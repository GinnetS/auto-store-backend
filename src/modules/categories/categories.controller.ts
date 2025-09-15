import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../../common/roles.decorator';
import { RolesGuard } from '../../common/roles.guard';

@ApiTags('categories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  @Roles('admin')
  @Post()
  create(@Body() dto: CreateCategoryDto) { return this.service.create(dto); }

  @Roles('admin')
  @Get()
  findAll() { return this.service.findAll(); }

  @Roles('admin')
  @Get(':id')
  findOne(@Param('id') id: string) { return this.service.findOne(id); }

  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) { return this.service.update(id, dto); }

  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) { return this.service.remove(id); }
}
