import React from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'


function MyBlogs() {
    
    const [data, setData] = useState([])
    const [data2, setData2] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      ( async () => {
        axios.get("http://localhost:5000/user/get", {
          headers: { token: localStorage.getItem("token") },
        })
        .then((res) => {
          console.log(res.data.blogs)                    
          setData(res.data)         
          setLoading(false)           
        }).catch((err) => console.log(err))
      })();
    },[])

    useEffect(() => {
      ( async () => {
        axios.get("http://localhost:5000/blog")
        .then((res) => {
          console.log(res.data.blogs)
          setData2(res.data.blogs)                        
        }).catch((err) => console.log(err))
      })();
    },[])
    const handleDel = (id, e) => {
      e.preventDefault();
  
      axios.delete("http://localhost:5000/blog/"+id)    
      .then((res) => {
        console.log(res.data)
        window.location.href="/blogx"
      })
    }

  return (
    <div>
    {loading ? (
       <div className='mt-4'>
          <h2 align="center">Loading...</h2>
        </div>
        ):(
          <div className='container mt-4'>
          <h3>Name - {data.name}</h3>
          <h3>Email - {data.email}</h3>
          <div className="container mt-4">
              {
                data2.map((blog) => {
                  if(blog.user == data.userid){
                  return (
                    <div key={blog._id}>
                      <div className="card card1">
                          <div className="card-horizontal">
                              <div className="img-square-wrapper">
                                  <img className="img-card" src={blog.image} alt="Card image cap" />
                              </div>
                              <div className="card-body">
                                  <h4 className="card-title">{blog.title}</h4>
                                  <p className="card-text">{blog.desc}</p>
                              </div>
                          </div>
                          <div className="card-footer">                      
                            <button className="btn btn-danger" style={{marginRight:"15px"}} onClick={(e) => handleDel(blog._id, e)}>DELETE</button>      
                            <Link to={{
                              pathname:`update/`+blog._id,
                              state:{ blogid:blog._id}
                            }}>
                              <button className="btn btn-danger" >EDIT</button>
                            </Link>                                                          
                          </div>
                      </div>
                      <br/>                                                         
                    </div>
                  )
                  }
                })
              }
            </div>
          </div>
        )}
    </div>
  )
}

export default MyBlogs
