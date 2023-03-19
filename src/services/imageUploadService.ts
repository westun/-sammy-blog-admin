import httpServices from "./httpServices";
import config from "../config.json";
import { ImageUploadDTO } from "./types";

const apiUrl = config.apiUrl;
const apiEndpoint = `${apiUrl}/imageupload`;

export default function UploadImage(image: ImageUploadDTO) {
  return httpServices.post(apiEndpoint, image);
}
