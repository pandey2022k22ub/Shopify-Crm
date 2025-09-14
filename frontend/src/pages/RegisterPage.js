import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import API from "../api/apiService"

function RegisterPage() {
  const [name, setName] = useState("")
  const [storeUrl, setStoreUrl] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [msg, setMsg] = useState("")
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setMsg("")

    try {
      const payload = { name, store_url: storeUrl, email, password }
      const res = await API.post("/auth/register", payload)
      setMsg(res.data.msg || "Registered successfully")
      // settingd timeout to show message
      setTimeout(() => navigate("/login"), 1000)
    } catch (err) {
      const text = err?.response?.data?.msg || "Something went wrong"
      setMsg(text)
    }
  }

  // ---- styles ----
  const container = {
    display: "flex",
    justifyContent: "center",
    background: "#f7f9fb",
    alignItems: "center",
    minHeight: "100vh",
    
  }

  const card = {
    width: 400,
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
    background: "#0074D9",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    fontWeight: "bold",
  }

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={{ marginTop: 0, textAlign: "center" }}>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Store name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={input}
          />

          <input
            placeholder="Store URL (example.myshopify.com)"
            value={storeUrl}
            onChange={(e) => setStoreUrl(e.target.value)}
            required
            style={input}
          />

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
            Register
          </button>
        </form>

        <p style={{ marginTop: 14, textAlign: "center" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#0074D9", textDecoration: "none" }}>
            Login
          </Link>
        </p>

        {msg && (
          <p
            style={{
              marginTop: 12,
              color: msg.toLowerCase().includes("wrong") ? "red" : "green",
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

export default RegisterPage
