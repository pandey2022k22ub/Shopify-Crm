// simple axios setup to talk to backend
import axios from "axios"

const backendURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api"
    : "https://shopify-crm.onrender.com/api"

const API = axios.create({
  baseURL: backendURL,
})

// add token only for requests after login
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token")

  // skip adding token for login and register
  if (
    token &&
    !req.url.includes("/auth/login") &&
    !req.url.includes("/auth/register")
  ) {
    req.headers.Authorization = `Bearer ${token}`
  }

  return req
})

export default API
