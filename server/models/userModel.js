import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId: { type:String, required:true, unique:true},
    email: { type:String, required:true, unique:true},
    photo: { type:String, required:true},
    firstName: { type:String},
    lastName: { type:String},
    creditBalance: {type:Number, default:5}
})

const userModel = mongoose.models.user || mongoose.model("user",userSchema)

// This line creates the userModel from the userSchema.

// But it first checks:

// If mongoose.models.user already exists, it uses that.

// Else, it creates a new model with the name "user" using userSchema.

// This is useful to avoid the "OverwriteModelError" in environments like Next.js where modules are reloaded frequently.

export default userModel;