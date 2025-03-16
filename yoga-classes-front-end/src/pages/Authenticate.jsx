import React from "react";
import AuthForm from "../components/AuthForm";
import { Outlet, redirect } from "react-router-dom";
import httpClient from "../utils/httpClient";
import { updateUserDataOutsideReact } from "../store/user/user-context";

export default function Authentication() {
  // return <AuthForm></AuthForm>;
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export async function action({ request }) {
  debugger;
  const url = new URL(request.url);
  const pathSegments = url.pathname.split("/");
  const lastValue = pathSegments.filter(Boolean).pop();
  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await httpClient.post(`/users/${lastValue}`, authData);

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
  updateUserDataOutsideReact(response.data);

  return redirect("/");
}
