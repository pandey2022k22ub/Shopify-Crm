// index.js
// load all models and relations

const { DataTypes } = require("sequelize")
const { sequelize } = require("../config/db")

const Tenant = require("./Tenant")(sequelize, DataTypes)
const Customer = require("./Customer")(sequelize, DataTypes)
const Product = require("./Product")(sequelize, DataTypes)
const Order = require("./Order")(sequelize, DataTypes)
const CartAbandonEvent = require("./CartAbandonEvent")(sequelize, DataTypes)

// relations
Tenant.hasMany(Customer, { foreignKey: "tenant_id" })
Customer.belongsTo(Tenant, { foreignKey: "tenant_id" })

Tenant.hasMany(Product, { foreignKey: "tenant_id" })
Product.belongsTo(Tenant, { foreignKey: "tenant_id" })

Tenant.hasMany(Order, { foreignKey: "tenant_id" })
Order.belongsTo(Tenant, { foreignKey: "tenant_id" })

Customer.hasMany(Order, { foreignKey: "customer_id" })
Order.belongsTo(Customer, { foreignKey: "customer_id" })

Tenant.hasMany(CartAbandonEvent, { foreignKey: "tenant_id" })
CartAbandonEvent.belongsTo(Tenant, { foreignKey: "tenant_id" })

Customer.hasMany(CartAbandonEvent, { foreignKey: "customer_id" })
CartAbandonEvent.belongsTo(Customer, { foreignKey: "customer_id" })

module.exports = {
  sequelize,
  Tenant,
  Customer,
  Product,
  Order,
  CartAbandonEvent
}
