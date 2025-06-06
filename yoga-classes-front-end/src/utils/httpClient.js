import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:3000", // API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Error Response:", error);
    if(error.code === "ERR_NETWORK" )
    {
      return Promise.reject(error);
    }
    // Handle 401 Unauthorized globally (redirect to login)
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      window.location.href = "/auth";
    }

    return Promise.reject(error);
  }
);

export default httpClient;
