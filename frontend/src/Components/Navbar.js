import React,{useState, useEffect} from "react";
import axios from "axios";
import img from '../lll.png'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

function useWindowSize() {
    const [size, setSize] = React.useState([window.innerHeight, window.innerWidth]);
    React.useEffect(() =>{
      const handleResize = () => {
        setSize([window.innerHeight, window.innerWidth]);
      }
      window.addEventListener("resize", handleResize);
    },[])
    return size;
  }
  

function Navbar() {

    const token = localStorage.getItem("token");
    const [height,width] = useWindowSize();

    const [data, setData] = useState([])
    useEffect(() => {
        ( async () => {
          axios.get("http://localhost:5000/user/get", {
            headers: { token: localStorage.getItem("token") },
          })
          .then((res) => {                                
            setData(res.data)                    
          }).catch((err) => console.log(err))
        })();
      },[])

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:"#874C62"}}>
        <div className="container">
            <Link to="/blog"><img src={img} alt="SN" className="nav-img"/></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto ml-2">                    
                    <li className="nav-item active">
                        <Link to="/blog" className="nav-link">All Blogs <span className="sr-only">(current)</span></Link>
                    </li>      
                    { token ? (             
                        <>
                            <li className="nav-item active">
                                <Link to="/blog/add" className="nav-link">Add Blogs <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item active">
                                <Link to="/blogx" className="nav-link">My Blogs <span className="sr-only">(current)</span></Link>
                            </li>
                        </>
                    ):(<></>)
                    }
                    { 
                        width < "992" && !token ? (
                        <>
                            <li className="nav-item active">
                                <Link className="nav-link" to="/login">Login <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link" to="/signup">Signup <span className="sr-only">(current)</span></Link>
                            </li>
                        </>
                        ):(
                            <></>
                        )
                    }
                    { 
                        width < "992" && token ? (
                        <>                           
                            <li className="nav-item active">
                                <Link className="nav-link" to="/" onClick={handleLogout}>Logout <span className="sr-only">(current)</span></Link>
                            </li>
                        </>
                        ):(
                            <></>
                        )
                    }
                </ul>      
                {
                    width >= "992" && !token ? (
                        <>
                            <Link to="/login">
                                <button className="btnnav2">Login</button>
                            </Link>
                            <Link to="/signup">
                                <button className="btnnav2">Signup</button>
                            </Link>
                        </>
                    ):(<></>)
                }      
                {
                    width >= "992" && token ? (
                        <>                                                 
                            <button className="btnnav3">Welcome {data.name}</button>                            
                            <button className="btnnav2" onClick={handleLogout}>Logout</button>                            
                        </>
                    ):(<></>)
                }   
            </div>
        </div>
    </nav>
  );
}

export default Navbar;