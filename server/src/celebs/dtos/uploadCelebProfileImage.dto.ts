import { CoreFileUploadOutput } from 'src/common/dtos/core.dto';

export type UploadCelebProfileImageInput = Express.Multer.File;

export class UploadCelebProfileImageOutput extends CoreFileUploadOutput {}
