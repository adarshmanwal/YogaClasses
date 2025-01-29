export function getAuthToken() {
    return localStorage.getItem("token");
  }
  
  export function tokenLoader({ request }) {
    const token = getAuthToken();
    return token;
  }
  