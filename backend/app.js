import express  from "express";
import mongoose from "mongoose";
import Userrouter from "./routes/user-routes.js";
import Blogrouter from "./routes/blog-routes.js"; 
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json())
app.use("/user/",Userrouter)
app.use("/blog/",Blogrouter)
mongoose.connect(
    "mongodb+srv://sarvesh07:sga07@cluster0.kqobqm0.mongodb.net/?retryWrites=true&w=majority"
)
.then(() => app.listen(5000))
.then(() => console.log("succ"))
.catch((err) => console.log(err))

//sarthak312
//aRj3RhKuAAFeLOMa
