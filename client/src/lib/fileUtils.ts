export interface StorageResult {
  ok: boolean;
  error?: string;
}

interface UploadFileResult extends StorageResult {
  url?: string;
}

interface UploadFileInput {
  file: File | Blob;
  endpoint: string;
}

type UploadFile = (
  uploadFileInput: UploadFileInput
) => Promise<UploadFileResult>;

// Upload file to storage
export const uploadFile: UploadFile = async ({ file, endpoint }) => {
  try {
    const formBody = new FormData();
    formBody.append("file", file);
    const { ok, error, url } = await (
      await fetch(
        `${
          process.env.NODE_ENV === "production"
            ? `https://nearceleb.com/${endpoint}`
            : `http://localhost:4444/${endpoint}`
        }`,
        {
          method: "POST",
          body: formBody,
        }
      )
    ).json();
    if (!ok) {
      return {
        ok: false,
        error,
      };
    }
    return {
      ok: true,
      url: url + "",
    };
  } catch (error) {
    return {
      ok: false,
      error: "Cannot upload image file(s)",
    };
  }
};
