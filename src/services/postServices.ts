import httpServices from "./httpServices";
import config from "../config.json";
import { Post } from "../components/post/types";

const apiUrl = config.apiUrl;

const apiEndpoint = `${apiUrl}/posts`;

export function getPosts() {
  return httpServices.get(apiEndpoint);
}

export function getPost(postId: number) {
  return httpServices.get(`${apiEndpoint}/${postId}`);
}

export function addPost(post: Post) {
  return httpServices.post(apiEndpoint, post);
}

export function updatePost(post: Post) {
  return httpServices.put(`${apiEndpoint}/${post.id}`, post);
}

export function deletePost(id: number) {
  return httpServices.delete(`${apiEndpoint}/${id}`);
}
