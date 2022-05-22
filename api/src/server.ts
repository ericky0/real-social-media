import express from "express"
import mongoose from "mongoose"
import dotenv from  "dotenv"
import helmet from "helmet"
import morgan from "morgan"
import { router } from "./routes"

const app = express()
dotenv.config()

// database connection
mongoose.connect(process.env.MONGO_URL!, () => {
  console.log("📦 Connected to MongoDB")
})

//middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
app.use(router)

app.listen(3000, () =>
  console.log("🔥 backend server started at http://localhost:3000")
)