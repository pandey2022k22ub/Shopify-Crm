//using redis to reduce respnse time 
const Redis = require("ioredis")

const redis = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379
})

redis.on("connect", () => {
  console.log("redis connected")
})

redis.on("error", (err) => {
  console.log("redis error", err)
})

module.exports = redis
