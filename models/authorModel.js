import mongoose, { Schema } from "mongoose";
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        
    },
    lastname: {
        type: String,
        
    },
    email: {
        type: String,
        unique:true
    },
    password: {
        type: String,
        
    },
    about: {
        type: String,
        
    },
    image: {
        type: String,
        
    },
   
    
},{timestamps:true});
export default mongoose.model('Author', authorSchema);