import httpServices from "./httpServices";
import { isTokenExpired } from "../util/authToken";
import config from "../config";
import { LOCAL_STORAGE_TOKEN_KEY } from "../constants/authConstants";

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

export function currentToken() {
  return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
}

export function tokenIsValid() {
  const existingToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  if (existingToken) {
    const tokenIsExpired = isTokenExpired(existingToken);
    if (!tokenIsExpired) {
      return true;
    }
  }

  return false;
}
