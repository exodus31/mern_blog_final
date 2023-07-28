import  express  from "express";
import { getAllUser, signup, login, get } from "../controllers/user-controller.js";

const Userrouter = express.Router();

Userrouter.get("/", getAllUser)
Userrouter.post("/signup",signup)
Userrouter.post("/login",login)
Userrouter.get("/get",get)

export default Userrouter;
