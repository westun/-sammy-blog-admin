import httpServices from "./httpServices";
import config from "../config.json";

function getApiEndpoint(postId) {
  return `${config.apiUrl}/posts/${postId}/comments`;
}

export function getComments(postId) {
  return httpServices.get(getApiEndpoint(postId));
}
