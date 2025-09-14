// push and pull events from redis list collection

const redis = require("../config/redis")

// push to queue
async function pushEvent(event) {
  try {
    await redis.lpush("shopify-events", JSON.stringify(event))
  } catch (err) {
    console.log("failed to push event", err)
  }
}

// pull from queue
async function popEvent() {
  try {
    const data = await redis.rpop("shopify-events")
    return data ? JSON.parse(data) : null
  } catch (err) {
    console.log("failed to pop event", err)
    return null
  }
}

module.exports = { pushEvent, popEvent }
