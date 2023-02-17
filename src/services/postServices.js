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

export function updatePost(post) {
  try {
    console.log("update post called with", post);
    return httpServices.put(`${apiEndpoint}/${post.id}`, post);
  } catch (error) {
    console.log(error);
  }
}
