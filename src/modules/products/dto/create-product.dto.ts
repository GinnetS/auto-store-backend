import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsNumberString, IsOptional, IsPositive, IsString, Matches, MaxLength } from 'class-validator';

export class CreateProductDto {
  @ApiProperty() @IsString() @IsNotEmpty() @MaxLength(140) name: string;
  @ApiProperty() @IsString() @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/) slug: string;
  @ApiProperty({ required: false }) @IsOptional() @IsString() description?: string;
  @ApiProperty() @IsString() @MaxLength(80) brand: string;
  @ApiProperty() @IsString() @MaxLength(80) model: string;
  @ApiProperty() @IsNumberString() price: string;
  @ApiProperty() @IsInt() @IsPositive() stock: number;
  @ApiProperty({ isArray: true, required: false }) @IsOptional() @IsArray() images?: string[];
  @ApiProperty({ required: false }) @IsOptional() @IsBoolean() isActive?: boolean;
  @ApiProperty() @IsString() categoryId: string;
}
