import httpClient from "../utils/httpClient";

export const fetchEmployees = async (path) => {
  try {
    const response = await httpClient.get(path);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};
