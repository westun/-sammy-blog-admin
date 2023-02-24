import jwtDecode from "jwt-decode";

function getCurrentTime() {
  return Date.now() / 1000;
}

export function isTokenExpired(token) {
  const decodedToken = jwtDecode(token);
  const currentTime = getCurrentTime();
  return decodedToken.exp < currentTime;
}

export function secondsUntilExpire(token) {
  const decodedToken = jwtDecode(token);
  const currentTime = getCurrentTime();
  return decodedToken.exp - currentTime;
}
