// check jwt token

const jwt = require("jsonwebtoken")

function authMiddleware(req, res, next) {
  const header = req.headers["authorization"]
  if (!header) return res.status(401).json({ msg: "no token" })

  const token = header.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret")
    req.tenant_id = decoded.tenant_id
    next()
  } catch (err) {
    return res.status(401).json({ msg: "invalid token" })
  }
}

module.exports = authMiddleware
