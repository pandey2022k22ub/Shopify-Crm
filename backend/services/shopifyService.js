
// here we could have connecting it with shopify API 

const axios = require("axios")

// just a placeholder function
async function fetchProducts(shopUrl, token) {
  try {
    const res = await axios.get(`${shopUrl}/admin/api/2023-10/products.json`, {
      headers: { "X-Shopify-Access-Token": token }
    })
    return res.data.products
  } catch (err) {
    console.log("shopify fetch failed", err.message)
    return []
  }
}

module.exports = { fetchProducts }
