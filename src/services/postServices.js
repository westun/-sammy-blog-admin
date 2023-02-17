import httpServices from "./httpServices";

const apiUrl = "http://localhost:3000/";

const apiEndpoint = `${apiUrl}posts`;

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
