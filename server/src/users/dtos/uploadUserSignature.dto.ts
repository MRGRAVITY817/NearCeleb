import { CoreFileUploadOutput } from 'src/common/dtos/core.dto';

export type UploadUserSignatureInput = Express.Multer.File;

export class UploadUserSignatureOutput extends CoreFileUploadOutput {}
