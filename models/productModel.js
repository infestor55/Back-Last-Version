
import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    
    name:{
        type: String,
        
    },
    description: {
        type:String,
       
    },
    price: {
        type:String,
        
    },
    color: {
        type:String,
        
    },
    image: {
        type:String,
        
    },
    idOwner: {
        type: String,
        
    },
    idCategory: {
        type: String,
        
    },
},{timestamps:true})
export default mongoose.model('product',productSchema);