
// logic for dashboard data

const { Customer, Order } = require("../models")
const { Op } = require("sequelize")

// total customers, orders, revenue
async function getMetrics(req, res) {
  try {
    const tenant_id = req.tenant_id

    const totalCustomers = await Customer.count({ where: { tenant_id } })
    const totalOrders = await Order.count({ where: { tenant_id } })
    const totalRevenue = await Order.sum("total_price", { where: { tenant_id } })

    res.json({ totalCustomers, totalOrders, totalRevenue })
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: "server error" })
  }
}

// top 5 customers by moneyy spend
async function getTopCustomers(req, res) {
  try {
    const tenant_id = req.tenant_id

    // raw query with sequelize
    const top = await Order.findAll({
      attributes: ["customer_id", [Order.sequelize.fn("SUM", Order.sequelize.col("total_price")), "totalSpend"]],
      where: { tenant_id },
      group: ["customer_id"],
      order: [[Order.sequelize.literal("totalSpend"), "DESC"]],
      limit: 5
    })

    res.json(top)
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: "server error" })
  }
}

// orders in date range
async function getOrdersByDate(req, res) {
  try {
    const tenant_id = req.tenant_id
    const { from, to } = req.query

    const where = { tenant_id }
    if (from && to) {
      where.order_date = { [Op.between]: [new Date(from), new Date(to)] }
    }

    const orders = await Order.findAll({ where })
    res.json(orders)
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: "server error" })
  }
}

module.exports = { getMetrics, getTopCustomers, getOrdersByDate }
