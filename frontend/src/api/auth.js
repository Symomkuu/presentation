import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
});

// Axios interceptor for automatic token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = localStorage.getItem("refresh");
      if (refresh) {
        try {
          const data = await api.post("/users/token/refresh/", { refresh });
          if (data.data.access) {
            localStorage.setItem("access", data.data.access);
            originalRequest.headers["Authorization"] = `Bearer ${data.data.access}`;
            return api(originalRequest);
          }
        } catch {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          window.location.href = "/login";
        }
      } else {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);


export const registerUser = async (email, password) => {
  const response = await api.post("/users/register/", { email, password });
  return response.data;
};


export const loginUser = async (email, password) => {
  const response = await api.post("/users/login/", { email, password });
  return response.data; 
};

export const getUserInfo = async (token) => {
  const response = await api.get("/users/me/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};