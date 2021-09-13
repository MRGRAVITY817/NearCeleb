import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsVerifiedStorage } from './credentials/storage.credentials';
import {
  UploadLetterOutput,
  UploadStampOutput,
  UploadTrendCoverImageOutput,
  UploadTrendMainImageOutput,
} from './dtos';

@Controller('storage')
export class StorageController {
  @Post('trend/main-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadTrendMainImage(
    @UploadedFile() file,
  ): Promise<UploadTrendMainImageOutput> {
    const S3 = AwsVerifiedStorage();
    const bucketName = process.env.TREND_BUCKET;
    const objectName = `main-image/${Date.now() + file.originalname}`;
    try {
      await S3.putObject({
        Body: file.buffer,
        Bucket: bucketName,
        Key: objectName,
        ACL: 'public-read',
      }).promise();
      const url = `https://kr.object.ncloudstorage.com/${bucketName}/${objectName}`;
      return {
        ok: true,
        url,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot upload main image',
      };
    }
  }
  @Post('trend/cover-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadTrendCoverImage(
    @UploadedFile() file,
  ): Promise<UploadTrendCoverImageOutput> {
    const S3 = AwsVerifiedStorage();
    const bucketName = process.env.TREND_BUCKET;
    const objectName = `cover-image/${Date.now() + file.originalname}`;
    try {
      await S3.putObject({
        Body: file.buffer,
        Bucket: bucketName,
        Key: objectName,
        ACL: 'public-read',
      }).promise();
      const url = `https://kr.object.ncloudstorage.com/${bucketName}/${objectName}`;
      return {
        ok: true,
        url,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot upload cover image',
      };
    }
  }
  // Stamp CRUD
  @Post('stamp')
  @UseInterceptors(FileInterceptor('file'))
  async uploadStamp(@UploadedFile() file): Promise<UploadStampOutput> {
    const S3 = AwsVerifiedStorage();
    const bucketName = process.env.CELEB_PAGE_BUCKET;
    const objectName = `stamp-image/${Date.now() + file.originalname}`;
    try {
      await S3.putObject({
        Body: file.buffer,
        Bucket: bucketName,
        Key: objectName,
        ACL: 'public-read',
      }).promise();
      const url = `https://kr.object.ncloudstorage.com/${bucketName}/${objectName}`;
      return {
        ok: true,
        url,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Cannot upload stamp image',
      };
    }
  }
}
