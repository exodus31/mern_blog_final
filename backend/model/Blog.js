import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title:{
        type: String,
        required: true,        
    },
    desc:{
        type: String,
        required: true,        
    },
    image:{
        type: String,
        required: true,        
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref:"User",
        required: true,        
    },
    username:{
        type: String,
        required: true,
    }

})

export default mongoose.model("Blog", blogSchema);