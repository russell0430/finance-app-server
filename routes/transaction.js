import express from "express"
import Transaction from "../models/Transaction.js"

const router = express.Router()

router.get("/transactions", async (req, res) => {
  const id = setTimeout(() => {
    res.status(500).json({ message: "Timeout" })
  })
  try {
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 })
    clearTimeout(id)
    res.status(200).json(transactions)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
})
export default router
