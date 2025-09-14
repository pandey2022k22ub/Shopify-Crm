// app.js

const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
require("dotenv").config()

const app = express()

// ---- CORS setup ----
const allowedOrigins = [
  "http://localhost:3000", // React dev
  "https://your-frontend.vercel.app", // replace later with actual Vercel URL
]

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true)
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("CORS policy blocked this origin: " + origin), false)
      }
      return callback(null, true)
    },
    credentials: true, // if later you use cookies
  })
)

// parse JSON bodies
app.use(bodyParser.json())

// test route
app.get("/", (req, res) => {
  res.send("backend working")
})

// add routes
app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/dashboard", require("./routes/dashboardRoutes"))
app.use("/api/webhooks", require("./routes/webhookRoutes"))

module.exports = app
