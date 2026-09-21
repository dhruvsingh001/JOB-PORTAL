import "./config/instrument.js"

import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/db.js"

import * as Sentry from "@sentry/node"

//initialize express
const app=express()

//conncet database
await connectDB()

//middleware
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("api working")
})
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

Sentry.setupExpressErrorHandler(app);

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})