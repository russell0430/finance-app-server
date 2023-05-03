import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet"
import kpiRoutes from "./routes/kpi.js"
import productRoutes from "./routes/product.js"
import transactionRoutes from "./routes/transaction.js"

import { kpis, products, transactions } from "./data/data.js"
import KPI from "./models/KPI.js"
import Product from "./models/Product.js"
import Transaction from "./models/transaction.js"
// Configuration
dotenv.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(cors())

// Routes
app.use("/kpi", kpiRoutes)
app.use("/product", productRoutes)
app.use("/transaction", transactionRoutes)

// Mongoose Setup

const PORT = process.env.PORT || 9000
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`))

    /* ADD DATA ONE TIME ONLY OR AS NEEDED */
    // await mongoose.connection.db.dropDatabase();

    // KPI.insertMany(kpis);
    // Product.insertMany(products);
    // Transaction.insertMany(transactions);
    // console.log("done")
  })
  .catch((error) => console.log(`${error} \nMongoDB did not connect`))
