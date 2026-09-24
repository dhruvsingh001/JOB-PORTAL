import "./config/instrument.js"

import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/db.js"
import companyroutes from "./routes/companyroutes.js"
import jobroutes from "./routes/jobroutes.js"
import userRoutes from "./routes/userRoutes.js"
import * as Sentry from "@sentry/node"
import { clerkWebhooks } from "./controllers/webhooks.js"
import connectCloudinary from "./config/cloudinary.js"
import { clerkMiddleware } from '@clerk/express'

//initialize express
const app=express()

//conncet database
await connectDB()
await connectCloudinary()

//middleware
// Svix verifies the exact bytes sent by Clerk, so this route must receive a raw body.
app.post('/webhooks', express.raw({ type: 'application/json' }), clerkWebhooks)
app.use(clerkMiddleware())
app.use(cors())
app.use(express.json())

//routes

app.get("/",(req,res)=>{
    res.send("api working")
})
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.use('/api/company',companyroutes)
app.use('/api/jobs', jobroutes)
app.use('/api/user',userRoutes)


// Port
const PORT = process.env.PORT || 5000

Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})

