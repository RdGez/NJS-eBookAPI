import { error } from '../interfaces/error.interface';

import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

export const handleErrors = (error: error): never => {
  switch (+error.code) {
    case 23505:
      throw new BadRequestException(error.detail);
    default:
      throw new InternalServerErrorException('Internal server error');
  }
};
