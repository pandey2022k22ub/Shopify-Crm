
import axios from "axios"

///cors issue check
const backendURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api"
    : "https://your-backend.onrender.com/api" // 

const API = axios.create({
  baseURL: backendURL,
})

// attachind token if its exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token")
  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }
  return req
})

export default API
