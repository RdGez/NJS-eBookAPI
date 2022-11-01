import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ebooks')
export class Ebook {
  @ApiProperty({
    example: 'c2522779-0e3c-4e5b-b1a1-b1cb2792715e',
    description: 'Unique identifier of the ebook',
  })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({
    example: 'The Lord of the Rings',
    description: 'Name of the ebook',
  })
  @Column('text', {
    nullable: false,
  })
  title: string;

  @ApiProperty({
    example: 'J. R. R. Tolkien',
    description: 'Author of the ebook',
  })
  @Column('text', {
    nullable: false,
  })
  author: string;

  @ApiProperty({
    example: 'hhtps://example.com/ebook.jpg',
    description: 'Image of the ebook',
  })
  coverUrl?: string;

  @ApiProperty({
    example:
      'The Lord of the Rings is an epic high fantasy novel written by English author and scholar J. R. R. Tolkien.',
    description: 'Description of the ebook',
  })
  @Column('text', {
    nullable: false,
  })
  description?: string;

  @ApiProperty({
    example: 'it_ebook',
    description: 'Url of the ebook',
  })
  slug?: string;
}
