import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', ()=>{
        console.log("Database Connected")
    })

   await mongoose.connect("mongodb+srv://santosh:santosh1123@cluster0.dzsgx.mongodb.net/bg-removal");

}

export default connectDB

