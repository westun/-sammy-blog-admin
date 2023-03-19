import jwtDecode from "jwt-decode";

function getCurrentTime() {
  return Date.now() / 1000;
}

export function isTokenExpired(token: string) {
  const decodedToken: any = jwtDecode(token);
  const currentTime = getCurrentTime();
  return decodedToken.exp < currentTime;
}

export function secondsUntilExpire(token: string) {
  const decodedToken: any = jwtDecode(token);
  const currentTime = getCurrentTime();
  return decodedToken.exp - currentTime;
}
