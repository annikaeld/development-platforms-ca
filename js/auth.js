const API_BASE = "http://localhost:3000";

function getToken() {
  return localStorage.getItem("token");
}

function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

function isLoggedIn() {
  return !!getToken();
}

function saveAuth(token, user) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
}

function clearAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

function logout() {
  clearAuth();
  window.location.href = "index.html";
}

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
}
