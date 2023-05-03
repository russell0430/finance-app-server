import express from "express"
import Product from "../models/Product.js"

const router = express.Router()

router.get("/products", async (req, res) => {
  const id = setTimeout(() => {
    res.status(500).json({ message: "Timeout" })
  }, process.env.TIMEOUT || 9000)
  try {
    const products = await Product.find()
    clearTimeout(id)
    res.status(200).json(products)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
})
export default router
