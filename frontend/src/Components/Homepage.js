import React from 'react'

function Homepage() {

  const token = localStorage.getItem("token");
  return (
    <div>
      {
        token ? (
          <div>
            Logged In
          </div>
        ):(
          <div>
            Not Logged In
          </div>
        )
      }
    </div>
  )
}

export default Homepage