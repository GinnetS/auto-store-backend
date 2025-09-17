// src/payments/dto/create-order.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ItemDto } from './item.dto';

export class CreateOrderDto {
  @ApiProperty({ type: [ItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items: ItemDto[];

  @ApiProperty({ example: 'USD', required: false })
  @IsOptional()
  @IsString()
  currency?: string;
}
