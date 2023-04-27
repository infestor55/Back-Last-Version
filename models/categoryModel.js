import mongoose, { Schema } from "mongoose";
    const categorySchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        }
        
    },{timestamps:true});
    export default mongoose.model('Category', categorySchema);