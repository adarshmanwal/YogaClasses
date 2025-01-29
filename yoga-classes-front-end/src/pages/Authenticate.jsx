import React from "react";
import AuthForm from "../components/AuthForm";
import { redirect } from "react-router-dom";

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

  const response = await fetch("http://localhost:3000/users/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if(response.status === 401 || response.status === 422){
    return response
  }
  if(!response.ok){
    throw new Response("Authentication failed");
  }

  const resData = await response.json();
  const token = resData.token;
  localStorage.setItem("token", token);
  

  return redirect("/");
}
