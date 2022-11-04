import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import { EbooksService } from './ebooks.service';
import { CreateEbookDto } from './dto/create-ebook.dto';
import { UpdateEbookDto } from './dto/update-ebook.dto';

import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from '../common/helpers/fileFilters';

@Controller('ebooks')
export class EbooksController {
  constructor(private readonly ebooksService: EbooksService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('cover', {
      fileFilter: fileFilter,
      limits: { fileSize: 1000000 },
    }),
  )
  create(
    @Body() createEbookDto: CreateEbookDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.ebooksService.create(createEbookDto, file);
  }

  @Get()
  findAll() {
    return this.ebooksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ebooksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEbookDto: UpdateEbookDto) {
    return this.ebooksService.update(id, updateEbookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ebooksService.remove(id);
  }
}
