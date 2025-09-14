// Tenant.js
// tenant table (for each store)

module.exports = (sequelize, DataTypes) => {
  const Tenant = sequelize.define("Tenant", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: DataTypes.STRING,
    store_url: DataTypes.STRING,
    email: DataTypes.STRING,  // make sure this exists!
    api_key: DataTypes.STRING // still storing hashed password
  })

  return Tenant
}
