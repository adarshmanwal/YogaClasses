import httpClient from "../utils/httpClient";
import { SHOP_PATH } from "../utils/routesPath";

export async function loader() {
  const response = await httpClient.get(`${SHOP_PATH.ALL}`);
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
