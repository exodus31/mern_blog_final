import express from "express";
import { addBlog, deleteById, getAllBlogs, getBlogById, getBlogByUser, updateBlog } from "../controllers/blog-controller.js";

const Blogrouter = express.Router();

Blogrouter.get("/", getAllBlogs)
Blogrouter.post("/add", addBlog)
Blogrouter.put("/update/:id", updateBlog)
Blogrouter.get("/:id", getBlogById)
Blogrouter.delete("/:id", deleteById)
Blogrouter.get("/user/:id", getBlogByUser)

export default Blogrouter;

