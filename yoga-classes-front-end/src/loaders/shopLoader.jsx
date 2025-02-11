export async function loader() {
  const response = await fetch("http://localhost:3000/shops/all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 401 || response.status === 422) {
    return response;
  }

  const resData = await response.json();
  return resData.data;
}
