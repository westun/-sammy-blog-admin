import * as AuthConstants from "../constants/authConstants";

export function getToken() {
  const token = localStorage.getItem(AuthConstants.LOCAL_STORAGE_TOKEN_KEY);
  const refreshToken = localStorage.getItem(
    AuthConstants.LOCAL_STORAGE_REFRESH_TOKEN
  );
  return { token, refreshToken };
}

export function saveToken(token: string, refreshToken: string) {
  localStorage.setItem(AuthConstants.LOCAL_STORAGE_TOKEN_KEY, token);
  localStorage.setItem(AuthConstants.LOCAL_STORAGE_REFRESH_TOKEN, refreshToken);
}

export function removeToken() {
  localStorage.removeItem(AuthConstants.LOCAL_STORAGE_TOKEN_KEY);
  localStorage.removeItem(AuthConstants.LOCAL_STORAGE_REFRESH_TOKEN);
}
