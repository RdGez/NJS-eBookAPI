import { v2 } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

export const cloudinaryConfig = (config: ConfigService) => ({
  cloud_name: config.get('CLOUDINARY_CLOUD_NAME'),
  api_key: config.get('CLOUDINARY_API_KEY'),
  api_secret: config.get('CLOUDINARY_API_SECRET'),
});

export const CloudinaryProvider = {
  provide: 'Cloudinary',
  useFactory: (): void => {
    v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  },
};
