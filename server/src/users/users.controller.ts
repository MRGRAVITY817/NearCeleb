import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { NAVER_OBJECT_STORAGE } from 'src/common/common.constants';
import { AwsVerifiedStorage } from 'src/storage/credentials/storage.credentials';
import {
  UploadUserCoverImageInput,
  UploadUserCoverImageOutput,
  UploadUserProfileImageInput,
  UploadUserProfileImageOutput,
  UploadUserSignatureInput,
  UploadUserSignatureOutput,
} from './dtos';

@Controller('users')
export class UsersController {
  @Post('profile-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadUserProfileImage(
    @UploadedFile() profileImage: UploadUserProfileImageInput,
  ): Promise<UploadUserProfileImageOutput> {
    const S3 = AwsVerifiedStorage();
    const BUCKET = process.env.USER_INFO_BUCKET;
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
        error: 'Cannot upload user profile image',
      };
    }
  }

  @Post('cover-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadUserCoverImage(
    @UploadedFile() file: UploadUserCoverImageInput,
  ): Promise<UploadUserCoverImageOutput> {
    const S3 = AwsVerifiedStorage();
    const BUCKET = process.env.USER_INFO_BUCKET;
    const OBJECT = `cover-image/${Date.now()}-${file.originalname}`;
    try {
      await S3.putObject({
        Body: file.buffer,
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
        error: 'Cannot upload user cover image',
      };
    }
  }

  @Post('signature')
  @UseInterceptors(FileInterceptor('file'))
  async uploadUserSignature(
    @UploadedFile() file: UploadUserSignatureInput,
  ): Promise<UploadUserSignatureOutput> {
    const S3 = AwsVerifiedStorage();
    const BUCKET = process.env.USER_INFO_BUCKET;
    const OBJECT = `signature/${Date.now()}-${file.originalname}`;
    try {
      await S3.putObject({
        Body: file.buffer,
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
        error: 'Cannot upload user signature',
      };
    }
  }
}
