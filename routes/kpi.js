import express from "express"
import KPI from "../models/KPI.js"

const router = express.Router()

router.get("/kpis", async (req, res) => {
  const id = setTimeout(() => {
    res.status(500).json({ message: "Timeout" })
  })
  try {
    const kpis = await KPI.find()
    clearTimeout(id)
    res.status(200).json(kpis)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
})
export default router
