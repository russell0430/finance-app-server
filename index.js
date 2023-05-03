import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet"
import kpiRoutes from "./routes/kpi.js"
import productRoutes from "./routes/product.js"
import transactionRoutes from "./routes/transaction.js"

// import { kpis, products, transactions } from "./data/data.js"
// import KPI from "./models/KPI.js"
// import Product from "./models/Product.js"
// import Transaction from "./models/Transaction.js"
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

app.get("/", (req, res) => {
  res.send("Hello wrold!\ny You made it successfully")
})
// Mongoose Setup

const PORT = process.env.PORT || 8080
await mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(`${error} \nMongoDB did not connect`))

app.listen(PORT, () => console.log(`Server Port: ${PORT}`))

/* ADD DATA ONE TIME ONLY OR AS NEEDED */
// await mongoose.connection.db.dropDatabase();

// KPI.insertMany(kpis);
// Product.insertMany(products);
// Transaction.insertMany(transactions);


// fix bug
// https://stackoverflow.com/questions/75565239/no-exports-found-in-module-error-when-deploying-express-rest-api-on-vercel
export default app
