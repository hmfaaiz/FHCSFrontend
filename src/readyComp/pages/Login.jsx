import React from 'react'
import Form from "../components/login/Form"
import wave from "../image/wave.png"
import bg from "../image/bg.svg"
import "../css/style3.css"

const Login = () => {
  return (
    <div className='loginBody'>

      <img className="wave" src={wave} />
      <div className="logincontainer">
        <div className="img">
          <img src={bg} />
        </div>
        <Form />
      </div>

    </div>
  )
}

export default Login
