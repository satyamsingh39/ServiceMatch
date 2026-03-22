import axios from "axios";
import { auth } from "./firebase";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add a request interceptor to add the Firebase ID token to the headers
api.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
