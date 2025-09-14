import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import API from "../api/apiService"

function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [msg, setMsg] = useState("")
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    setMsg("")

    try {
      const res = await API.post("/auth/login", { email, password })
      const token = res.data.token
      if (token) {
        localStorage.setItem("token", token)
        navigate("/dashboard")
      } else {
        setMsg("Login failed")
      }
    } catch (err) {
      setMsg(err?.response?.data?.msg || "Error logging in")
    }
  }

  // -## styles ----
  const container = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#f7f9fb",
  }

  const card = {
    width: 380,
    background: "#fff",
    padding: "30px 25px",
    borderRadius: 6,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  }

  const input = {
    width: "100%",
    padding: "10px",
    marginBottom: 12,
    border: "1px solid #ccc",
    borderRadius: 4,
  }

  const button = {
    width: "100%",
    padding: "10px",
    
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    background: "#0074D9",
    fontWeight: "bold",
  }

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={{ marginTop: 0, textAlign: "center" }}>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={input}
          />

          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={input}
          />

          <button type="submit" style={button}>
            Login
          </button>
        </form>

        <p style={{ marginTop: 14, textAlign: "center" }}>
          New here?{" "}
          <Link to="/register" style={{ color: "#0074D9", textDecoration: "none" }}>
            Register
          </Link>
        </p>

        {msg && (
          <p
            style={{
              marginTop: 12,
              color: msg.toLowerCase().includes("error") ? "red" : "green",
              textAlign: "center",
            }}
          >
            {msg}
          </p>
        )}
      </div>
    </div>
  )
}

export default LoginPage
