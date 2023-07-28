import axios from 'axios'
import React from 'react'
import {useState, useEffect} from 'react'

function AddBlog() {

  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")  
  const [url, setUrl] = useState("")
  const [data, setData] = useState([])

    useEffect(() => {
      ( async () => {
        axios.get("http://localhost:5000/user/get", {
          headers: { token: localStorage.getItem("token") },
        })
        .then((res) => {
          console.log(res.data)                    
          setData(res.data)
        }).catch((err) => console.log(err))
      })();
    },[])

  const addBlog = () => {
    axios.post("http://localhost:5000/blog/add",{
      title:title,
      desc:desc,
      image:url,
      user:data.userid,
      username:data.name
    }).then((res) => {
      if(res.status == 200){
        console.log(res.data)
        window.location.href="/blog"
      }else{
        console.log(res.data)        
      }
    })
  }
  
  return (
    <div className="container mt-4">      
        <div className="form-group">
          <label >Title</label>
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  onChange={(e) => setTitle(e.target.value)}/>          
        </div>
        <div className="form-group">
          <label>Desc</label>
          <input type="text" className="form-control" id="exampleInputPassword1" onChange={(e) => setDesc(e.target.value)}/>
        </div>        
        <div className="form-group">
          <label>Image Url</label>
          <input type="text" className="form-control" id="exampleInputPassword1" onChange={(e) => setUrl(e.target.value)}/>
        </div>        
        <button type="submit" className="btn btn-secondary" onClick={addBlog}>Submit</button>      
    </div>
  )
}

export default AddBlog