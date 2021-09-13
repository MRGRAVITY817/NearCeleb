import { CoreFileUploadOutput } from 'src/common/dtos/core.dto';

export type UploadUserCoverImageInput = Express.Multer.File;

export class UploadUserCoverImageOutput extends CoreFileUploadOutput {}
