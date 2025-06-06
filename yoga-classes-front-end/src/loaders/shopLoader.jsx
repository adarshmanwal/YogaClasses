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

  const response = await httpClient.get(`${SHOP_PATH.ROOT}/${params.id}`);
  if (response.status === 401 || response.status === 422) {
    return response;
  }
  return response.data.data;
}
