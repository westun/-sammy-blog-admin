export interface Credentials{
  username: string;
  password: string;
}

export interface ImageUploadDTO {
  fileName: string;
  dataUrl: string;
}

export interface ImageDataDTO {
  fileName: string;
  fileUrl: string;
}