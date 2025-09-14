
const { Sequelize } = require("sequelize")
require("dotenv").config()

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "mysql", // using mysql
    logging: false
  }
)

async function connectDB() {
  try {
    await sequelize.authenticate()
    console.log("db connected")
  } catch (err) {
    console.log("db connection failed", err.message)
  }
}

module.exports = { sequelize, connectDB }
