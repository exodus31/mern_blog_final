import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState("none");        
    const [data, setData] = useState([]);        

   const handleLogin = () => {
        axios.post("http://localhost:5000/user/login",{
            email:email,
            password:password
        })
        .then((res) => {
            if(res.status === 201){
                const token = res.data.token;
                localStorage.setItem("token", token);
                window.location.href="/";
            }else{                
                console.log(res.data.message)
                
            }

        }).catch((err) => {
            console.log(err.response.data.message)
            setAlert(err.response.data.message)
        })
    }

  return (
    <div>
        <div className="container mt-4">
            <h6 align="center">Result -{alert}</h6>            
            <div className="form-group">
                <label >Email address</label>
                <input type="email" name="email" className="form-control"  onChange={(e) => setEmail(e.target.value)}/>                
            </div>
            <div className="form-group">
                <label >Password</label>
                <input type="text" name="password" className="form-control"  onChange={(e) => setPassword(e.target.value)}/>
            </div>            
            <button className="btn btn-secondary" type='submit' onClick={handleLogin}>Submit</button>            
        </div>
    </div>
  )
}

export default Login