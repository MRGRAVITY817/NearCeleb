import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { NAVER_OBJECT_STORAGE } from 'src/common/common.constants';
import { AwsVerifiedStorage } from 'src/storage/credentials/storage.credentials';
import { CelebsService } from './celebs.service';
import {
  UploadCelebProfileImageInput,
  UploadCelebProfileImageOutput,
} from './dtos';

@Controller('celebs')
export class CelebsController {
  constructor(private readonly celebsService: CelebsService) {}

  @Post('profile-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadStamp(
    @UploadedFile() profileImage: UploadCelebProfileImageInput,
  ): Promise<UploadCelebProfileImageOutput> {
    const S3 = AwsVerifiedStorage();
    const BUCKET = process.env.CELEB_PAGE_BUCKET;
    const OBJECT = `profile-image/${Date.now()}-${profileImage.originalname}`;
    try {
      await S3.putObject({
        Body: profileImage.buffer,
        Bucket: BUCKET,
        Key: OBJECT,
        ACL: 'public-read',
      }).promise();
      const url = `${NAVER_OBJECT_STORAGE}/${BUCKET}/${OBJECT}`;
      return {
        ok: true,
        url,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot upload celeb profile image',
      };
    }
  }
}
