import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        
    },
    
    description: {
        type: String,
        
    },
    date: {
        type: String,
        
    },
    content: {
        type: String,
        
    },
    image: {
        type: String,
        
    }
    
    
},{timestamps:true});
export default mongoose.model('Blog', blogSchema);