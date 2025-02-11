import React from "react";
import PageContent from "../components/PageContent";
import { useRouteError } from "react-router-dom";
import Header from "../components/Header";

export default function Error() {
  const error = useRouteError();

  let title = "An error has occurred";
  let message = "Please try again later";
  if (error.status === 404) {
    title = "Page not found";
    message = "The page you are looking for does not exist";
  }
  if (error.status === 500) {
    title = "Internal server error";
    message = JSON.parse(error.data).message;
  }

  return (
    <>
      <Header></Header>
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}
