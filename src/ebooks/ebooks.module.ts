import { Module } from '@nestjs/common';
import { EbooksService } from './ebooks.service';
import { EbooksController } from './ebooks.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Ebook } from './entities/ebook.entity';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ebook]), CategoriesModule],
  controllers: [EbooksController],
  providers: [EbooksService],
  exports: [EbooksService, TypeOrmModule],
})
export class EbooksModule {}
