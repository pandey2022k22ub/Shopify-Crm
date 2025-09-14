import React from "react"
import { Link, useNavigate } from "react-router-dom"

function Navbar() {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <aside
      style={{
        width: 220,
        minHeight: "100vh",
        background: "#0b0b0d", // charcoal colorr
        color: "#fff",
        padding: 20,
      }}
    >
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ color: "#4cc0ff", margin: 0 }}>Xeno</h3>
        <small style={{ color: "#9aa" }}>FDE Demo</small>
      </div>

      <nav>
        <Link to="/dashboard" style={{ color: "#fff", display: "block", padding: "8px 0" }}>
          Dashboard
        </Link>
        <button
          onClick={handleLogout}
          style={{ marginTop: 12, padding: 8, width: "100%", cursor: "pointer" }}
        >
          Logout
        </button>
      </nav>
    </aside>
  )
}

export default Navbar
