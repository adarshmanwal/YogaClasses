import { data } from "react-router-dom";
import httpClient from "../utils/httpClient";

export async function loader() {
  // const response = await fetch("http://localhost:3000/shops/all", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  const response = await httpClient.get("/shops/all");
  if (response.status === 401 || response.status === 422) {
    return response;
  }

  return response.data.data;
}


export async function shopDetailsLoader({request,params}){
  console.log("request",request)

  const response = await httpClient.get(`/shops/${params.id}`);
  if (response.status === 401 || response.status === 422) {
    return response;
  }
  return response.data.data;
}
