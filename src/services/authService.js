import { getToken } from "./authTokenService";
import * as AuthConstants from "../constants/authConstants";
import { isTokenExpired } from "../util/authToken";

export async function login(credentials) {
  const result = await getToken(credentials);

  localStorage.setItem(
    AuthConstants.LOCAL_STORAGE_TOKEN_KEY,
    result.data.token
  );

  return result;
}

export function logout() {
  localStorage.removeItem(AuthConstants.LOCAL_STORAGE_TOKEN_KEY);

  return Promise.resolve(true);
}

export function isAuthenticated() {
  var token = localStorage.getItem(AuthConstants.LOCAL_STORAGE_TOKEN_KEY);
  if (!token) {
    return false;
  }

  return !isTokenExpired(token);
}
