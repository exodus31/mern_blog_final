import mongoose from "mongoose";
import validator from 'validator';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required: [true,'Please Enter Email'],
        unique:true,  
        validate:[validator.isEmail, 'Enter a valid Email'] 
    },
    password:{
        type: String,
        required: [true,'Please Enter Password'],
        minlenght:6,
    },
    blogs:[{type:mongoose.Types.ObjectId, ref:"Blog", required:true}],
})

export default mongoose.model("User", userSchema);