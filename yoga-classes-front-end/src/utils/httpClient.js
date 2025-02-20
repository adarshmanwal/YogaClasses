import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://51.20.189.2:3000", // API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(
  (config) => {
    console.log("Sending Request:", config);

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
    console.log("Response Received:", response);
    return response;
  },
  (error) => {
    console.error("Error Response:", error);

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
