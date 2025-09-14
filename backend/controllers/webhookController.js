// i have tried to map tenant id with shopify header of mine.
// Shopify webhook handlers for multi-tenant ingestion


const { Order, Customer, Product, CartAbandonEvent, Tenant } = require("../models")

// #################
// Customer webhook
// ################
async function customerCreated(req, res) {
  try {
    // extracting Shopify header
    const shopDomain = req.headers["x-shopify-shop-domain"]
    console.log(" Incoming Customer Webhook from:", shopDomain)

    // find the tenant for this shop
    const tenant = await Tenant.findOne({ where: { store_url: shopDomain } })
    if (!tenant) {
      console.log(" Tenant not found for shop:", shopDomain)
      return res.status(404).json({ msg: "tenant not found for this shop" })
    }

    // extract customer info from Shopify payload whatevr are required as shopify is sending a big payload.
    const email = req.body.email
    const name = `${req.body.first_name || ""} ${req.body.last_name || ""}`.trim()

    // save customer
    const customer = await Customer.create({
      tenant_id: tenant.id,
      name,
      email,
    })

    console.log(" Customer saved in DB for tenant:", tenant.id, " ->", email)
    res.json({ msg: "customer saved", customer })
  } catch (err) {
    console.log(" Error in customerCreated:", err)
    res.status(500).json({ msg: "error" })
  }
}

// ###########
// Order webhook
// ######
async function orderCreated(req, res) {
  try {
    const shopDomain = req.headers["x-shopify-shop-domain"]
    console.log(" Incoming Order Webhook from:", shopDomain)

    const tenant = await Tenant.findOne({ where: { store_url: shopDomain } })
    if (!tenant) {
      console.log(" Tenant not found for shop:", shopDomain)
      return res.status(404).json({ msg: "tenant not found" })
    }

    // find or create customer for this order
    let customer = await Customer.findOne({
      where: { email: req.body.customer?.email, tenant_id: tenant.id },
    })

    if (!customer) {
      customer = await Customer.create({
        tenant_id: tenant.id,
        name: `${req.body.customer?.first_name || ""} ${req.body.customer?.last_name || ""}`.trim(),
        email: req.body.customer?.email,
      })
      console.log("ℹ Customer created from order:", customer.email)
    }

    // save order
    const order = await Order.create({
      tenant_id: tenant.id,
      customer_id: customer.id,
      total_price: parseFloat(req.body.total_price || 0),
      order_date: req.body.created_at,
    })

    console.log(" Order saved for tenant:", tenant.id, " -> Order ID:", order.id)
    res.json({ msg: "order saved", order })
  } catch (err) {
    console.log(" Error in orderCreated:", err)
    res.status(500).json({ msg: "error" })
  }
}

// ---------------------------
// Product webhook
// ---------------------------
async function productCreated(req, res) {
  try {
    const shopDomain = req.headers["x-shopify-shop-domain"]
    console.log(" Incoming Product Webhook from:", shopDomain)

    const tenant = await Tenant.findOne({ where: { store_url: shopDomain } })
    if (!tenant) {
      console.log(" Tenant not found for shop:", shopDomain)
      return res.status(404).json({ msg: "tenant not found" })
    }

    const product = await Product.create({
      tenant_id: tenant.id,
      name: req.body.title,
      price: parseFloat(req.body.variants?.[0]?.price || 0),
    })

    console.log(" Product saved for tenant:", tenant.id, " ->", product.name)
    res.json({ msg: "product saved", product })
  } catch (err) {
    console.log(" Error in productCreated:", err)
    res.status(500).json({ msg: "error" })
  }
}

// ---------------------------
// Cart abandoned webhook is a brownie point for this company.They waana know why their customer is no more interestd
// ---------------------------
async function cartAbandoned(req, res) {
  try {
    const shopDomain = req.headers["x-shopify-shop-domain"]
    console.log("👉 Incoming Cart Abandoned Webhook from:", shopDomain)

    const tenant = await Tenant.findOne({ where: { store_url: shopDomain } })
    if (!tenant) {
      console.log(" Tenant not found for shop:", shopDomain)
      return res.status(404).json({ msg: "tenant not found" })
    }

    const cart = await CartAbandonEvent.create({
      tenant_id: tenant.id,
      customer_id: req.body.customer?.id || null,
      cart_items: JSON.stringify(req.body.line_items || []),
      abandoned_at: req.body.created_at,
    })

    console.log(" Cart abandon event saved for tenant:", tenant.id)
    res.json({ msg: "cart event saved", cart })
  } catch (err) {
    console.log(" Error in cartAbandoned:", err)
    res.status(500).json({ msg: "error" })
  }
}

module.exports = { orderCreated, customerCreated, productCreated, cartAbandoned }
