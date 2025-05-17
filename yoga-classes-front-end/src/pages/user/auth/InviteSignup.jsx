import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import httpClient from "../../../utils/httpClient";

export default function InviteSignup() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  useEffect(() => {
    if (!token) {
      alert("Invalid invite link");
      navigate("/auth/login");
      return;
    }
    const acceptInvite = async () => {
      try {
        const response = await httpClient.post("/users/accept-invite", { token });
        if (response.status === 200) {
          alert("Invitation accepted successfully. Please log in.");
          navigate("/auth/login");
        }
      } catch (error) {
        console.error("Error accepting invite:", error);
        alert("Failed to accept invite. Please try again.");
        navigate("/auth/login");
      }
    };

    acceptInvite();
  }, [token, navigate]);

  return <p>Processing your invitation...</p>;
}
