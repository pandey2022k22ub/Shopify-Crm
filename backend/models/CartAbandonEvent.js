// i have trying to add this feature because e-commerce companies like flipkart,amazon see their loss as customer didnt order the product.
// abandoned cart events

module.exports = (sequelize, DataTypes) => {
  const CartAbandonEvent = sequelize.define("CartAbandonEvent", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    tenant_id: { type: DataTypes.INTEGER, allowNull: false },
    customer_id: { type: DataTypes.INTEGER, allowNull: false },
    cart_items: DataTypes.JSON, 
    abandoned_at: DataTypes.DATE
  })

  return CartAbandonEvent
}
