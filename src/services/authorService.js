import httpServices from "./httpServices";
import config from "../config.json";

const apiUrl = config.apiUrl;

const apiEndpoint = `${apiUrl}/authors`;

export function getAuthor(id) {
  return httpServices.get(`${apiEndpoint}/${id}`);
}

export function getAuthors() {
  return httpServices.get(apiEndpoint);
}

export function addAuthor(author) {
  return httpServices.post(apiEndpoint, author);
}

export function updateAuthor(author) {
  return httpServices.put(`${apiEndpoint}/${author.id}`, author);
}

export function deleteAuthor(id) {
  return httpServices.delete(`${apiEndpoint}/${id}`);
}
