import axios from 'axios'
import React from 'react'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

function Blogs() {

  const [user, setUser] = useState([])
  const [data,setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ( async () => {
      axios.get("http://localhost:5000/user/get", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res.data)                    
        setUser(res.data)                    
      }).catch((err) => console.log(err))
    })();
  },[])

  useEffect(() => {
    ( async () => {
      axios.get("http://localhost:5000/blog")
      .then((res) => {
        console.log(res.data.blogs)
        setData(res.data.blogs)
        setLoading(false)
      }).catch((err) => console.log(err))
    })();
  },[])
  
  const handleDel = (id, e) => {
    e.preventDefault();

    axios.delete("http://localhost:5000/blog/"+id)    
    .then((res) => {
      console.log(res.data)
      window.location.href="/blog"
    })
  }

  const handleupd = (id, e) => {
    e.preventDefault();
    window.location.href=`blog/update/`+id    
  }

  return (
    <div>
      {loading ? (
        <div className='mt-4'>
          <h2 align="center">Loading...</h2>
        </div>
      ):(
      <>
        <div className="container mt-4">
          {
            data.map((data) =>{
              return (
                <div key={data._id}>
                  <div className="card card1">
                      <div className="card-horizontal">
                          <div className="img-square-wrapper">
                              <img className="img-card" src={data.image} alt="Card image cap" />
                          </div>
                          <div className="card-body">
                              <h4 className="card-text">{data.title}</h4>
                              <p className="card-text">{data.desc}</p>
                          </div>
                      </div>
                      <div className="card-footer">
                      { 
                        user.userid == data.user ? (
                          <>                          
                            <button className="btn btn-danger" style={{marginRight:"20px"}} onClick={(e) => handleDel(data._id, e)}>DELETE</button>                            
                            <Link to={{
                              pathname:`update/`+data._id,
                              state:{ blogid:data._id}
                            }}>
                              <button className="btn btn-danger" >EDIT</button>
                            </Link>
                          </>
                        ):(<h5>Posted By - {data.username}</h5>)
                      }
                      </div>
                  </div>
                  <br/>                                                         
                </div>
              )
            })
          }
        </div>
      </>
      )}
    </div>
  )
}

export default Blogs