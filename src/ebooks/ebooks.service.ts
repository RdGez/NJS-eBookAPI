import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEbookDto } from './dto/create-ebook.dto';
import { UpdateEbookDto } from './dto/update-ebook.dto';

import { Repository } from 'typeorm';
import { Ebook } from './entities/ebook.entity';

@Injectable()
export class EbooksService {
  constructor(
    @InjectRepository(Ebook)
    private readonly ebookRepository: Repository<Ebook>,
  ) {}

  private readonly logger = new Logger('EbooksService');

  async create(createEbookDto: CreateEbookDto) {
    try {
      const ebook = this.ebookRepository.create(createEbookDto);
      await this.ebookRepository.save(ebook);
      return ebook;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async findAll() {
    try {
      const ebooks = await this.ebookRepository.find();
      return ebooks;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async findOne(id: string) {
    try {
      const ebook = this.ebookRepository.findOneBy({ uuid: id });
      if (!ebook) throw new NotFoundException('Ebook not found');

      return ebook;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async update(id: string, updateEbookDto: UpdateEbookDto) {
    try {
      const ebook = await this.findOne(id);
      await this.ebookRepository.update(ebook.uuid, updateEbookDto);

      return await this.findOne(id);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async remove(id: string) {
    try {
      const ebook = await this.findOne(id);
      await this.ebookRepository.remove(ebook);

      return {
        ok: true,
        message: 'eBook deleted successfully',
        deletedEbook: ebook,
      };
    } catch (error) {
      this.logger.error(error);
    }
  }
}
