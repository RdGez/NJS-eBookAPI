import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

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
    example:
      'The Lord of the Rings is an epic high fantasy novel written by English author and scholar J. R. R. Tolkien.',
    description: 'Description of the ebook',
  })
  @Column('text', {
    nullable: true,
  })
  description?: string;

  @ApiProperty({
    example: 'hhtps://example.com/ebook.jpg',
    description: 'Image of the ebook',
  })
  @Column('text', {
    nullable: true,
  })
  coverUrl?: string;

  @ApiProperty({
    example: 'it_ebook',
    description: 'Url of the ebook',
  })
  @Column('text', {
    nullable: true,
  })
  slug?: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @ApiProperty({
    example: 'Category Object',
    description: 'Category associated with the ebook',
  })
  @OneToOne(() => Category, (category) => category.uuid, { eager: true })
  @JoinColumn()
  category: string;

  @BeforeInsert()
  @BeforeUpdate()
  normalizeSlug() {
    const param = !this.slug ? this.title : this.slug;

    this.slug = param
      .trim()
      .normalize('NFD')
      .replace(/[^\w\s]/gi, '')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ /g, '_')
      .toLowerCase();
  }
}
