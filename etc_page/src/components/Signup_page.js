import React from 'react'

function Signup_page() {

  return (
    <>
      <div className="container">
        <form action="/signup" method="POST">
          <label for="uname">
            <b>Username</b>
          </label>
          <input
            type="text"
           
            placeholder="Enter Username"
            name="username"
            required
          ></input>

          <label for="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            
            placeholder="Enter Password"
            name="password"
            required
          ></input>

          <button type="submit">signup</button>
        </form>
      </div>
    </>
  )
}

export default Signup_page