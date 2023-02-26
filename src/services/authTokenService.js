import httpServices from "./httpServices";
import config from "../config";

const apiUrl = config.apiUrl;
const apiEndpoint = `${apiUrl}/auth`;

export async function getToken(credentials) {
  return httpServices.post(`${apiEndpoint}/login`, credentials);
}

export async function getRefreshToken(token, refreshToken) {
  return httpServices.post(`${apiEndpoint}/refresh-token`, {
    token,
    refreshToken,
  });
}
