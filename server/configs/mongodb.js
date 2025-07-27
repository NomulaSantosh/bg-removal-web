import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', ()=>{
        console.log("Database Connected")
    })

   await mongoose.connect("mongodb+srv://santosh:Santosh1123@cluster0.ng8ffya.mongodb.net//bg-removal");

}

export default connectDB

