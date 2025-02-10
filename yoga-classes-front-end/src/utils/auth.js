import { redirect } from "react-router-dom";

export function getAuthToken() {
  return localStorage.getItem("token");
}

export function tokenLoader() {
  const token = getAuthToken();
  return token;
}

export function checkAuthLoader(){
  const token = getAuthToken();
  if(!token){
    return redirect("/auth");
  }
  return null;
}