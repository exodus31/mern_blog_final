import mongoose from "mongoose";
import multer from "multer";
import Blog from "../model/Blog.js";
import User from "../model/User.js";
import path from 'path';

const storage = multer.diskStorage({
    destination:(req, file, cb) => (
        cb(null, '../uploads')        
    ),
    filename:(req, file, cb) => {
        console.log(file)
        cb(null, Date.now + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

export const getAllBlogs= async(req, res, next) => {
    let blogs2;
    try{
        blogs2 = await Blog.find();
    }catch(err){
        console.log(err)
    }
    if(!blogs2){
        return res.status(404).json({message:"No Blogs Found"})
    }
    let blogs=blogs2.reverse();
    return res.status(200).json({blogs})
}

export const addBlog = async(req,res,next) => {
    const {title,desc,image,user,username} = req.body;

    let existinguser;
    try{
        existinguser = await User.findById(user)
    }catch(err){
        return console.log(err)
    }
    if(!existinguser){
        return res.status(400).json({message:"No User Found"})
    }
    const blog = new Blog({
        title,
        desc,
        image,       
        user,
        username,
    })    
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existinguser.blogs.push(blog);
        await existinguser.save({session});
        await session.commitTransaction();        
    }catch(err){
        console.log(err)
        return res.status(500).json({message: err})
    }
    return res.status(200).json({blog})
}

export const updateBlog = async(req,res,next) => {
    const {title,desc} = req.body;
    const blogId = req.params.id;
    let blog;
    try{
        blog = await Blog.findByIdAndUpdate(blogId,{
            title,
            desc,        
        })
    }catch(err){
        return console.log(err)
    }
    if(!blog){
        return res.status(500).json({message:"Unable To Update Blog"})
    }
    return res.status(200).json({blog})
  
}

export const getBlogById = async(req,res,next) => {    
    const blogId = req.params.id;
    let blog;
    try{
        blog = await Blog.findById(blogId)
    }catch(err){
        return console.log(err)
    }
    if(!blog){
        return res.status(404).json({message:"Blog Not Found"})
    }
    return res.status(200).json({blog})
  
}

export const deleteById = async(req,res,next) => {    
    const blogId = req.params.id;
    let blog;

    try{
        blog = await Blog.findByIdAndRemove(blogId).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    }catch(err){
        return console.log(err)
    }
    if(!blog){
        return res.status(404).json({message:"Blog Not Found"})
    }
    return res.status(200).json({message:"Successfully deleted"})
  
}

export const getBlogByUser = async(req,res,next) => {    
    const userId = req.params.id;
    let userBlogs;
    try{
        userBlogs = await User.findById(userId).populate("blogs");
    }catch(err){
        return console.log(err)
    }
    if(!userBlogs){
        return res.status(404).json({message:"Blog Not Found"})
    }
    return res.status(200).json({userBlogs})
  
}