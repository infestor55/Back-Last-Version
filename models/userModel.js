import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        
    },
    email: {
        type: String,
        
        unique: true,
        
    },
    password: {
        type: String,
        
    },
    phone: {
        type: String,
       

    },
    adress:{
        type: String,
        
    },
    image: {
        type: String,
        
    },
   
    
},{timestamps:true})

export default mongoose.model('users', userSchema)