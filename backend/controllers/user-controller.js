import User from "../model/User.js";
import jwt from 'jsonwebtoken'

export const getAllUser = async(req, res, next) =>{
    let users;
    try{
        users = await User.find();        
    }catch(err){
        console.log(err)
    }
    if(!users){
        return res.status(404).json({message:"No Users Found"})        
    }
    return res.status(200).json({ users });
    
}

export const signup = async(req,res,next) => {
    const {name,email,password} = req.body;

    let existinguser;
    try{
        existinguser = await User.findOne({email})
    }catch(err){
        console.log(err)
    }
    if(existinguser){
        return res.status(400).json({message:"User already exists"})    
    }
    const user = new User({
        name,
        email,        
        password,
        blogs:[], 
    })
    try{
        await user.save();
    }catch(err){
        return console.log(err)
    }
    return res.status(201).json({user})

}

export const login = async(req,res,next) => {
    const {email,password} = req.body;

    let existinguser;
    try{
        existinguser = await User.findOne({email})
    }catch(err){
        console.log(err)
    }
    if(!existinguser){
        return res.status(404).json({message:"No User found"})    
    }
    
    if(password != existinguser.password){
        return res.status(404).json({message:"Incorrect Password"})
    }    
    let token = jwt.sign({ userId: existinguser._id }, "secretkey");
    return res.status(201).json({
        token:token,
        message:"Login Successful"
    })

}

export const get = async(req, res, next) => {
    jwt.verify(req.headers.token, "secretkey", (err ,dec) => {
        if(err){
            return res.status(401).json({
                message:"Please Login Again"
            })
        }
        User.findOne({_id:dec.userId}, (err, user) =>{
            if(err){
                return res.status(400).json({
                    message:"Please Try Again"
                })
            }
            return res.status(200).json({
                message:"Succ",
                userid:user._id,
                name:user.name,
                email:user.email,
                blogs:user.blogs
            })
        })
    })
}