import { redirect } from "react-router-dom";

function login() {
  localStorage.setItem("isLoggedIn", "true");
}

function logout() {
  localStorage.clear();
}

function isLoggedIn(): Boolean {
  return Boolean(localStorage.getItem("isLoggedIn"));
}

async function redirectAuthenticatedUserRouteLoader() {
  if (isLoggedIn()) return redirect("/dashboard");
  return null;
}

export { login, logout, isLoggedIn, redirectAuthenticatedUserRouteLoader };
