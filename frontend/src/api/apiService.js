
// Axios setup for calling our backend API

import axios from "axios";

// if running locally -> use localhost backend
// if deployed on Vercel -> use Render backend
const backendURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api"
    : "https://shopify-crm.onrender.com/api";

const API = axios.create({
  baseURL: backendURL,
});

// add token automatically if it exists in localStorage
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
