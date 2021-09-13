import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { NAVER_OBJECT_STORAGE } from 'src/common/common.constants';
import { AwsVerifiedStorage } from 'src/storage/credentials/storage.credentials';
import { UploadLetterImageInput, UploadLetterImageOutput } from './dtos';
import { LettersService } from './letters.service';

@Controller('letters')
export class LettersController {
  constructor(private readonly lettersService: LettersService) {}

  @Post('letter-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadUserProfileImage(
    @UploadedFile() letterImage: UploadLetterImageInput,
  ): Promise<UploadLetterImageOutput> {
    const S3 = AwsVerifiedStorage();
    const BUCKET = process.env.USER_INFO_BUCKET;
    const OBJECT = `letter-image/${Date.now()}-${letterImage.originalname}`;
    try {
      await S3.putObject({
        Body: letterImage.buffer,
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
        error: 'Cannot upload user profile image',
      };
    }
  }
}
