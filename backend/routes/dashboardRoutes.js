// dashboardRoutes.js
// routes for dashboard metrics

const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const { getMetrics, getTopCustomers, getOrdersByDate } = require("../controllers/dashboardController")

// protect all routes with auth
router.get("/metrics", authMiddleware, getMetrics)
router.get("/top-customers", authMiddleware, getTopCustomers)
router.get("/orders", authMiddleware, getOrdersByDate)

module.exports = router
