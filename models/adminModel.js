import mongoose from "mongoose";
const adminSchema = new mongoose.Schema({
   
    email: {
        type: String,
        unique: true,
        required: true
        
    },
    password: {
        type: String,
        required:true
    }
   
    
},{timestamps:true})

export default mongoose.model('admin', adminSchema)