import React from "react";
import { Outlet, redirect, UNSAFE_ErrorResponseImpl } from "react-router-dom";
import httpClient from "../utils/httpClient";
import { updateUserDataOutsideReact } from "../store/user/user-context";

export default function Authentication() {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export async function action({ request }) {
  try {
    const url = new URL(request.url);
    const endpoint = url.pathname.split("/").filter(Boolean).pop();
    const formData = await request.formData();

    const authData = {
      email: formData.get("email"),
      password: formData.get("password"),
      userType: formData.get("userType"),
    };

    const response = await httpClient.post(`/users/${endpoint}`, authData);
    if (![200, 201].includes(response.status)) {
      return response;
    }

    if (response.status === 201) {
      return redirect("/auth/login");
    }

    const { token, ...userData } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("userData", JSON.stringify(userData));
    updateUserDataOutsideReact(userData);

    return redirect("/");
  } catch (error) {
    if (error.response && error.response.data.error === "Validation error") {
      return {error: ["Email already exist"] }; // Ensure it's an array
    }
    return { error: ["An unexpected error occurred"] };
  }
}
