import { CoreFileUploadOutput } from 'src/common/dtos/core.dto';

export type UploadLetterImageInput = Express.Multer.File;

export class UploadLetterImageOutput extends CoreFileUploadOutput {}
