import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Homepage from './Components/Homepage';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Blogs from './Components/Blogs';
import AddBlog from './Components/AddBlog';
import BlogDetail from './Components/BlogDetail';
import MyBlogs from './Components/MyBlogs';
import './Components/Style.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {useSelector} from 'react-redux'

function App() {

  const isLoggedIn = useSelector(state=>state.isLoggedIn);
  console.log(isLoggedIn)

  return (
    <div>
      <Router>
      <Navbar />
        <Routes>
          <Route path="" element={<Homepage />}/> 
          <Route path="login" element={<Login />}/>
          <Route path="signup" element={<Signup />}/>
          <Route path="blog" element={<Blogs />}/>
          <Route path="blog/add" element={<AddBlog />}/>
          <Route path="blogx" element={<MyBlogs />}/>
          <Route path="blog/update/:id" element={<BlogDetail />}/>
          <Route path="blogx/update/:id" element={<BlogDetail />}/>
        </Routes>
      </Router >
    </div>
  );
}

export default App;
