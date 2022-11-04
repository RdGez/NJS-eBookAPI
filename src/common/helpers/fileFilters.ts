import { BadRequestException } from '@nestjs/common';

export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: any,
) => {
  if (!file) return callback(new Error('File is empty'), false);

  const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];
  const fileExtention = file.mimetype.split('/')[1];

  if (validExtensions.includes(fileExtention)) return callback(null, true);

  callback(
    new BadRequestException(
      `File type don't supported, only support: ${validExtensions}`,
    ),
    false,
  );
};
