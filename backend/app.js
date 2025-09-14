
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

// allowed frontend URLs
const allowedOrigins = [
  "http://localhost:3000",                // local React dev
  "https://shopify-crm-nu.vercel.app",    // deployed
];

app.use(
  cors({
    origin: function (origin, callback) {
      // some requests (Postman///
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(
          new Error("CORS policy blocked this origin: " + origin),
          false
        );
      }
    },
    credentials: true, // cookie
  })
);

// parse JSON requests
app.use(bodyParser.json());

// testingg
app.get("/", (req, res) => {
  res.send("backend working");
});

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/webhooks", require("./routes/webhookRoutes"));

module.exports = app;
