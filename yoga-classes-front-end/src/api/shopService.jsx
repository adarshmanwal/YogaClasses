import httpClient from "../utils/httpClient";

export const fetchShops = async (path) => {
  try {
    const response = await httpClient.get(path);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error("Error while fetching Shop:", error);
    throw error;
  }
};
