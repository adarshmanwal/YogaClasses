import httpClient from "../../utils/httpClient";
import {URL_PATH} from "../../utils/routesPath";

export async function loader(){
    const response = await httpClient.get(`${URL_PATH.USER_PROFILE}`);
    if (response.status === 401 || response.status === 422) {
        return response;
    }
    return response.data;
}