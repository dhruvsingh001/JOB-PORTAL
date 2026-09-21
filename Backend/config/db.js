import mongoose from "mongoose";

//function to connect mongo db database
const connectDB=async()=>{
    mongoose.connection.on("connected",()=> console.log("database connected"))
    await mongoose.connect(`${process.env.MONGODB_URI}/job_portal`)


}

export default connectDB