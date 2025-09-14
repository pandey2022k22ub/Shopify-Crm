// current i am not using redis+workprocess to keep things starightforwar amd simple if and infact for small request its also of no use,but if there has been 1000 orders i need it because my sql may choke.

const { Order, Customer, Product, CartAbandonEvent } = require("../models")
const { popEvent } = require("../services/queueService")

async function processEvents() {
  while (true) {
    const event = await popEvent()
    if (event) {
      try {
        if (event.type === "order") {
          await Order.create(event.data)
        } else if (event.type === "customer") {
          await Customer.create(event.data)
        } else if (event.type === "product") {
          await Product.create(event.data)
        } else if (event.type === "cart") {
          await CartAbandonEvent.create(event.data)
        }
        console.log("event processed:", event.type)
      } catch (err) {
        console.log("failed to save event", err)
      }
    } else {
      await new Promise((res) => setTimeout(res, 2000)) // wait a bit before checking again
    }
  }
}

processEvents()
