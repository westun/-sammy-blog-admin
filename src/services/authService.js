import { getToken, getRefreshToken } from "./authTokenService";
import * as AuthConstants from "../constants/authConstants";
import { isTokenExpired } from "../util/authToken";

export async function login(credentials) {
  const result = await getToken(credentials);

  saveTokenToStore(result.data.token, result.data.refreshToken);

  return result;
}

export function logout() {
  removeTokenFromStore();
}

export async function renewLogin() {
  const tokenResult = getTokenFromStore();

  const { data: newToken } = await getRefreshToken(
    tokenResult.token,
    tokenResult.refreshToken
  );

  saveTokenToStore(newToken.token, newToken.refreshToken);
}

export function isAuthenticated() {
  var tokenResult = getTokenFromStore();
  if (!tokenResult || !tokenResult.token) {
    return false;
  }

  return !isTokenExpired(tokenResult.token);
}

function getTokenFromStore() {
  const token = localStorage.getItem(AuthConstants.LOCAL_STORAGE_TOKEN_KEY);
  const refreshToken = localStorage.getItem(
    AuthConstants.LOCAL_STORAGE_REFRESH_TOKEN
  );
  return { token, refreshToken };
}

function saveTokenToStore(token, refreshToken) {
  localStorage.setItem(AuthConstants.LOCAL_STORAGE_TOKEN_KEY, token);
  localStorage.setItem(AuthConstants.LOCAL_STORAGE_REFRESH_TOKEN, refreshToken);
}

function removeTokenFromStore() {
  localStorage.removeItem(AuthConstants.LOCAL_STORAGE_TOKEN_KEY);
  localStorage.removeItem(AuthConstants.LOCAL_STORAGE_REFRESH_TOKEN);
}
