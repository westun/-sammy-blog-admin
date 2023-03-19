import httpServices from "./httpServices";
import config from "../config.json";
import { Credentials } from './types';

const apiUrl = config.apiUrl;
const apiEndpoint = `${apiUrl}/auth`;

export async function getToken(credentials : Credentials) {
  return httpServices.post(`${apiEndpoint}/login`, credentials);
}

export async function getRefreshToken(token: string, refreshToken: string) {
  return httpServices.post(`${apiEndpoint}/refresh-token`, {
    token,
    refreshToken,
  });
}
