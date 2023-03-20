import httpServices from "./httpServices";
import config from "../config.json";

function getApiEndpoint(postId: number) {
  return `${config.apiUrl}/posts/${postId}/comments`;
}

export function getComments(postId: number) {
  return httpServices.get(getApiEndpoint(postId));
}
