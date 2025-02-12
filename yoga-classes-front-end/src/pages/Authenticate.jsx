import React from "react";
import AuthForm from "../components/AuthForm";
import { redirect } from "react-router-dom";
import httpClient from "../utils/httpClient";

export default function Authentication() {
  return <AuthForm></AuthForm>;
}

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";
  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };
  if (mode !== "login" && mode !== "signup") {
    throw new Response("Invalid mode", { status: 400 });
  }

  const response = await httpClient.post(`/users/${mode}`, authData);

  if (response.status === 401 || response.status === 422) {
    return response;
  }
  if (response.statusText != "OK") {
    throw new Response("Authentication failed");
  }

  const token = response.data.token;

  // Store token and user data in localStorage
  localStorage.setItem("token", token);
  localStorage.setItem("userData", JSON.stringify(response.data));

  return redirect("/");
}
