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
