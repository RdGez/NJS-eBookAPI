import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateEbookDto {
  @ApiProperty({
    example: 'The Lord of the Rings',
    description: 'Name of the ebook',
  })
  @IsString()
  @MinLength(2)
  title: string;

  @ApiProperty({
    example: 'J. R. R. Tolkien',
    description: 'Author of the ebook',
  })
  @IsString()
  @MinLength(8)
  author: string;

  @ApiProperty({
    description: 'The category associated with the ebook',
    example: 'uuid of the category',
  })
  @IsString()
  category: string;

  @ApiProperty({
    example: 'hhtps://example.com/ebook.jpg',
    description: 'Image of the ebook',
  })
  @IsString()
  @IsOptional()
  coverUrl?: string;

  @ApiProperty({
    example:
      'The Lord of the Rings is an epic high fantasy novel written by English author and scholar J. R. R. Tolkien.',
    description: 'Description of the ebook',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'it_ebook',
    description: 'Url of the ebook',
  })
  @IsString()
  @IsOptional()
  slug?: string;
}
