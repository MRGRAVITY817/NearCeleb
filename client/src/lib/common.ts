// Convert Base64 string to Blob
export const dataUriToBlob = (dataUri: string) => {
  const byteString = atob(dataUri.split(",")[1]);
  const mimeString = dataUri.split(",")[0].split(":")[1].split(";")[0];
  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
};

// slugify english name
export const slugify = (str: string) => {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();
  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }
  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes
  return str;
};

// Capitalize the first letter
export const capFirst = (word: string) => {
  if (word.length === 1) {
    return word.charAt(0).toUpperCase();
  } else if (word.length > 1) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
};

export const uriToFile = async (uri: string) => {
  const res = await fetch(uri);
  const parsedBlob: any = await res.blob();
  parsedBlob.lastModifiedDate = new Date();
  parsedBlob.name = uri.slice(0, 12);
  return parsedBlob as File;
};

export type BooleanObject = { [key: string]: boolean };

export const arrayToBooleanObject = (array: string[]) => {
  const result: BooleanObject = {};
  array.map((element) => (result[element] = true));
  return result;
};

export const booleanObjectToArray = (object: BooleanObject) => {
  const result = Object.keys(object).filter((key) => object[key]);
  return result;
};

export const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const doesExistsById = (elementId: string) =>
  Boolean(document.getElementById(elementId));

export const intToArray = (data: number): number[] => {
  return Array.from({ length: data }, (_, i) => i + 1);
};
