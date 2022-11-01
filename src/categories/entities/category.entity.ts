import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Category {
  @ApiProperty({
    example: 'c2522779-0e3c-4e5b-b1a1-b1cb2792715e',
    description: 'Unique identifier of the category',
  })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({
    example: 'Fantasy',
    description: 'Name of the category',
  })
  @Column('text', {
    unique: true,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    example: 'Fantasy is a genre of fiction set in a fictional universe.',
    description: 'Description about the category',
  })
  @Column('text', {
    nullable: false,
  })
  description?: string;
}
