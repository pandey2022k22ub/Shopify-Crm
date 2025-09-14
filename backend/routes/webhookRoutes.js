// webhookRoutes.js
// routes for shopify webhooks

const express = require("express")
const router = express.Router()
const { orderCreated, customerCreated, productCreated, cartAbandoned } = require("../controllers/webhookController")

// these routes will be called by shopify (or we can test manually with postman)
router.post("/order-created", orderCreated)
router.post("/customer-created", customerCreated)
router.post("/product-created", productCreated)
router.post("/cart-abandoned", cartAbandoned)

module.exports = router
