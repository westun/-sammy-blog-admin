import httpServices from "./httpServices";
import config from "../config";

const apiUrl = config.apiUrl;
const apiEndpoint = `${apiUrl}/imageupload`;

export default function UploadImage(image) {
  return httpServices.post(apiEndpoint, image);
}
