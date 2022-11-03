import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  BeforeRecover,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({
    example: 'c2522779-0e3c-4e5b-b1a1-b1cb2792715e',
    description: 'Unique identifier',
  })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({
    example: 'Oscar Rodriguez',
    description: 'Full name',
  })
  @Column('text', { nullable: false })
  name: string;

  @ApiProperty({
    example: 'exampleEmail@mail.com',
    description: 'Email address',
  })
  @Column('text', {
    unique: true,
    nullable: false,
  })
  email: string;

  @ApiProperty({
    example: '$eKreTpAzzWord',
    description: 'Security password for the user account',
  })
  @Column('text', {
    nullable: false,
    select: false,
  })
  password: string;

  @ApiProperty({
    example: '[USER_ROLE, ADMIN_ROLE]',
    description: 'User assigned roles in the system',
  })
  @Column('text', {
    array: true,
    nullable: true,
    default: ['USER_ROLE'],
  })
  roles: string[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @BeforeInsert()
  @BeforeUpdate()
  emailToLowerCase() {
    this.email = this.email.toLowerCase().trim();
  }
}
