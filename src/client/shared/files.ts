export type ConvertedToBase64 = {
  fileBase64: string;
  mimetype: string;
  filename: string;
};

export function convertToBase64(file: File): Promise<ConvertedToBase64> {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;

      if (!result) {
        throw new Error('Cannot convert file to base64: result in empty');
      }

      resolve({
        fileBase64: result.toString(),
        mimetype: file.type,
        filename: file.name,
      });
    };

    reader.readAsDataURL(file);
  });
}
