import httpServices from "./httpServices";
import config from "../config.json";

const apiUrl = config.apiUrl;

const apiEndpoint = `${apiUrl}/posts`;

export function getPosts() {
  return httpServices.get(apiEndpoint);
}

export function getPost(postId) {
  return httpServices.get(`${apiEndpoint}/${postId}`);
}

export function addPost(post) {
  return httpServices.post(apiEndpoint, post);
}

export function updatePost(post) {
  return httpServices.put(`${apiEndpoint}/${post.id}`, post);
}

export function deletePost(id) {
  return httpServices.delete(`${apiEndpoint}/${id}`);
}
