import httpServices from "./httpServices";
import config from "../config.json";
import { Author } from './../components/author/types';

const apiUrl = config.apiUrl;

const apiEndpoint = `${apiUrl}/authors`;

export function getAuthor(id: number) {
  return httpServices.get(`${apiEndpoint}/${id}`);
}

export function getAuthors() {
  return httpServices.get(apiEndpoint);
}

export function addAuthor(author: Author) {
  return httpServices.post(apiEndpoint, author);
}

export function updateAuthor(author: Author) {
  return httpServices.put(`${apiEndpoint}/${author.id}`, author);
}

export function deleteAuthor(id: number) {
  return httpServices.delete(`${apiEndpoint}/${id}`);
}
