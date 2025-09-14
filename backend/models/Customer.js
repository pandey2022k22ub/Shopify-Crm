// Customer.js
// customer table

module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define("Customer", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    tenant_id: { type: DataTypes.INTEGER, allowNull: false },
    name: DataTypes.STRING,
    email: DataTypes.STRING
  })

  return Customer
}
