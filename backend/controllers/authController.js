const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { Tenant } = require("../models")


async function register(req, res) {
  try {
    const { name, store_url, email, password } = req.body


    if (!name || !store_url || !email || !password) {
      return res.status(400).json({ msg: "missing fields" })
    }

    
    const hashedPass = await bcrypt.hash(password, 10)

   
    const tenant = await Tenant.create({
      name,
      store_url: store_url.toLowerCase(), // normalizeing url
      email,
      api_key: hashedPass, // useing api_key column to store password hash
    })

    res.json({ msg: "tenant registered successfully", tenant })
  } catch (err) {
    console.error("Register Error:", err)
    res.status(500).json({ msg: "server error" })
  }
}


async function login(req, res) {
  try {
    const { email, password } = req.body

    
    const tenant = await Tenant.findOne({ where: { email } })
    if (!tenant) {
      return res.status(404).json({ msg: "tenant not found" })
    }

    
    const valid = await bcrypt.compare(password, tenant.api_key)
    if (!valid) {
      return res.status(400).json({ msg: "wrong password" })
    }

    //  Create JWT token
    const token = jwt.sign(
      { tenant_id: tenant.id }, // payload
      process.env.JWT_SECRET || "secret", // secret key
      { expiresIn: "1d" } // valid for 1 day
    )

    res.json({ msg: "login successful", token })
  } catch (err) {
    console.error("Login Error:", err)
    res.status(500).json({ msg: "server error" })
  }
}

module.exports = { register, login }
