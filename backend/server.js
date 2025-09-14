

const app = require("./app")
const { sequelize, connectDB } = require("./config/db")
const { Tenant, Customer, Product, Order, CartAbandonEvent } = require("./models")

const PORT = process.env.PORT || 5000

async function startServer() {
  try {
    await connectDB()
    await sequelize.sync({ alter: true }) // create/update tables if not exist

    app.listen(PORT, () => {
      console.log("server running on port " + PORT)
    })
  } catch (err) {
    console.log("failed to start server", err)
  }
}

startServer()
