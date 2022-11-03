import {
  createParamDecorator,
  InternalServerErrorException,
} from '@nestjs/common';

export const GetUser = createParamDecorator((data, context) => {
  const request = context.switchToHttp().getRequest();
  const user = request.user;

  if (!user)
    throw new InternalServerErrorException('User not found inside request');

  return !data ? user : user[data];
});
