// src/payments/dto/item.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ItemDto {
  @ApiProperty({ example: 'Filtro de aceite' })
  @IsString()
  name: string;

  @ApiProperty({ example: '1000' })
  @IsString() // si prefieres number, cámbialo a IsNumber y ajusta en tu lógica
  unit_amount: string;

  @ApiProperty({ example: 2 })
  @IsNumber()
  quantity: number;
}
