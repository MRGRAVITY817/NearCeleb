import { AwsVerifiedStorage } from 'src/storage/credentials/storage.credentials';

interface FileResult {
  ok: boolean;
  error?: string;
}

interface DeleteFileResult extends FileResult {}

interface DeleteFileInput {
  bucket: string;
  fileUrl: string;
}

type DeleteFile = (
  deleteFileInput: DeleteFileInput,
) => Promise<DeleteFileResult>;

export const deleteFile: DeleteFile = async ({ bucket: Bucket, fileUrl }) => {
  try {
    const S3 = AwsVerifiedStorage();
    const Key = fileUrl.replace(
      `https://kr.object.ncloudstorage.com/${Bucket}/`,
      ``,
    );
    await S3.deleteObject({
      Bucket,
      Key,
    }).promise();
    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      error: 'Cannot delete celeb image',
    };
  }
};
