import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Fantasy',
    description: 'Name of the category',
  })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({
    example: 'Ebooks about fantasy',
    description: 'Description of the category',
  })
  @IsString()
  @MinLength(5)
  @IsOptional()
  description?: string;
}
