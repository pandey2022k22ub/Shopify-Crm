// Product.js
// product table

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    tenant_id: { type: DataTypes.INTEGER, allowNull: false },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL
  })

  return Product
}
