

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { Tenant } = require("../models")

// register  new tenant
async function register(req, res) {
  try {
    const { name, store_url, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "missing fields" })
    }

    const hashedPass = await bcrypt.hash(password, 10)

    // saving that tenant
    const tenant = await Tenant.create({
      name,
      store_url: store_url.toLowerCase(),
      email,
      api_key: hashedPass // for now storing password in api_key field
    })

    res.json({ msg: "tenant registered", tenant })
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: "server error" })
  }
}

// login tenant
async function login(req, res) {
  try {
    const { email, password } = req.body

    const tenant = await Tenant.findOne({ where: { email } })
    if (!tenant) return res.status(404).json({ msg: "not found" })

    const valid = await bcrypt.compare(password, tenant.api_key)
    if (!valid) return res.status(400).json({ msg: "wrong password" })

    const token = jwt.sign(
      { tenant_id: tenant.id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    )

    res.json({ token })
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: "server error" })
  }
}

module.exports = { register, login }
