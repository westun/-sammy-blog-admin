import { getToken, getRefreshToken } from "./authTokenService";
import * as authTokenService from "./authTokenService";
import { isTokenExpired } from "../util/authToken";
import * as authTokenStore from "../store/authTokenStore";

export async function login(credentials) {
  const result = await authTokenService.getToken(credentials);

  authTokenStore.saveToken(result.data.token, result.data.refreshToken);

  return result;
}

export function logout() {
  authTokenStore.removeToken();
}

export async function renewLogin() {
  const tokenResult = authTokenStore.getToken();

  const { data: newToken } = await authTokenService.getRefreshToken(
    tokenResult.token,
    tokenResult.refreshToken
  );

  authTokenStore.saveToken(newToken.token, newToken.refreshToken);
}

export function isAuthenticated() {
  var tokenResult = authTokenStore.getToken();
  if (!tokenResult || !tokenResult.token) {
    return false;
  }

  return !isTokenExpired(tokenResult.token);
}
