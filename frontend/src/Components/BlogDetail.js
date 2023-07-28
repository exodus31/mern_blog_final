import React from 'react'
import {useState, useEffect} from 'react'
import {useLocation, useParams} from 'react-router-dom'
import axios from 'axios';

function BlogDetail() {

  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")  
  const [data, setData] = useState([])
  const {id} = useParams();  
  useEffect(() => {
    ( async () => {
      axios.get(`http://localhost:5000/blog/${id}`)
      .then((res) => {
        console.log(res.data.blog)       
        setData(res.data.blog) 
      }).catch((err) => console.log(err))
    })();
  },[])

  const handleupd = (e) =>{
        e.preventDefault();
    
        axios.put(`http://localhost:5000/blog/update/${id}`,{
          title:title,
          desc:desc
        })
        .then((res) => {
          console.log(res.data)
          window.location.href="/blog"        
        }).catch((err) => console.log(err))          
  }

  return (
    <div>
      <div className="container mt-4">
            <h6 align="center">Result -</h6>            
            <div className="form-group">
                <label >Title</label>
                <input type="email" name="email" className="form-control"  onChange={(e) => setTitle(e.target.value)}/>                
            </div>
            <div className="form-group">
                <label >Desc</label>
                <input type="text" name="password" className="form-control"  onChange={(e) => setDesc(e.target.value)}/>
            </div>            
            <button className="btn btn-secondary" type='submit' onClick={(e) => handleupd(e)}>Submit</button>            
        </div>
    </div>
  )
}

export default BlogDetail