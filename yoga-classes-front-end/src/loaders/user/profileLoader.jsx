import httpClient from "../../utils/httpClient";

export async function loader(){
    const response = await httpClient.get("/users/profile");
    if (response.status === 401 || response.status === 422) {
        return response;
    }
    return response.data;
}