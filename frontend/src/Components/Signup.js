import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'

function Signup() {

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState('none')

  const handleSignup = (e) => {
    e.preventDefault();

    axios.post("http://localhost:5000/user/signup",{
        email:email,
        password:password,
        name:name
    })
    .then((res) => {
      console.log(res.data)         
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
                <label >Name</label>
                <input type="text" name="name" className="form-control"  onChange={(e) => setName(e.target.value)}/>
            </div>        
            <div className="form-group">
                <label >Email address</label>
                <input type="email" name="email" className="form-control"  onChange={(e) => setEmail(e.target.value)}/>                
            </div>
            <div className="form-group">
                <label >Password</label>
                <input type="text" name="password" className="form-control"  onChange={(e) => setPassword(e.target.value)}/>
            </div>      
            { 
              password.length < 6 && password.length > 0 ? (
                <p style={{color:"red"}}>Password min length: 6</p>      
              ):(<p>&nbsp;</p>)
            }
            <button className="btn btn-secondary" type='submit' onClick={(e) => handleSignup(e)}>Submit</button>            
        </div>
    </div>
  )
}

export default Signup