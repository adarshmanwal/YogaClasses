import React from "react";
import AuthForm from "../../../components/AuthForm";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <AuthForm mode="login" />
      </div>
    </div>
  );
}
