import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  private readonly logger = new Logger(CategoriesService.name);

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = this.categoryRepository.create(createCategoryDto);
      await this.categoryRepository.save(category);
      return category;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async findAll() {
    try {
      return await this.categoryRepository.find();
    } catch (error) {
      this.logger.error(error);
    }
  }

  async findOne(id: string) {
    try {
      const category = await this.categoryRepository.findOneBy({ uuid: id });
      if (!category) throw new NotFoundException('Category not found');

      return category;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.findOne(id);
      await this.categoryRepository.update(category.uuid, updateCategoryDto);

      return this.findOne(id);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async remove(id: string) {
    try {
      const category = await this.findOne(id);
      await this.categoryRepository.delete(category.uuid);

      return {
        ok: true,
        message: 'Category deleted successfully',
        categoryDeleted: category,
      };
    } catch (error) {
      this.logger.error(error);
    }
  }
}
