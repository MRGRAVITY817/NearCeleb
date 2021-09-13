import { CoreFileUploadOutput } from 'src/common/dtos/core.dto';

export type UploadUserProfileImageInput = Express.Multer.File;

export class UploadUserProfileImageOutput extends CoreFileUploadOutput {}
