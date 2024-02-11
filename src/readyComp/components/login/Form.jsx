
// import "../../css/style3.css"
import React, { useState } from 'react'

import Cookies from "universal-cookie";
import { useNavigate } from 'react-router-dom';
import {adminsignin_url} from "../../../urls"

import avatar from "../../image/avatar.svg"
const Form = () => {

	const [mypassword, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [user, setUser] = useState('');
	const cookies = new Cookies();
	const navigate = useNavigate();
  
  
  
  
  
  
	const Signin = (e) => {
	  e.preventDefault()
  
  
  
	  const obj = {
		email: email,
		password: mypassword
	  }
  
	  console.log("obj",obj)
  
	  if (obj.email && obj.password) {
		console.log("obj",obj)
		fetch(adminsignin_url, {
		  method: "POST",
		  body: JSON.stringify(obj),
		  headers: {
			'Content-Type': 'application/json',
  
		  },
		})
		  .then((data) => data.json())
		  .then((res) => {
			
			if(res.token) {
			  alert("Welcome Back")
			  console.log(res)
			  setUser(res.token)
			  cookies.set("token", res.token)
			  localStorage.setItem("login", true)
			  navigate('/adminpanel')
  
			}else{
			  alert(res.message)
			}
		  })
		  .catch((err) => {
			console.log(err)
			alert("Try again")
		  })
  
  
	  }
	  else {
		alert("Fill all Data")
	  }
  
  
  
	}
  



  return (
<div className="login-content">
      <form className='loginform'>
				<img src={avatar}/>
				<h4 className="title">WELCOME TO FHCS</h4>
           		<div className="input-div">
           		   <div className="i">
           		   		<i className="fas fa-user"></i>
           		   </div>
           		   <div className="div">
           		   		
           		   		<input placeholder='Username' type="text" className="input"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
           		   </div>
           		</div>
           		<div className="input-div pass">
           		   <div className="i"> 
           		    	<i className="fas fa-lock"></i>
           		   </div>
           		   <div className="div">
           		    	
           		    	<input placeholder='Password' type="password" className="input"  value={mypassword} onChange={(e)=>setPassword(e.target.value)}/>
            	   </div>
            	</div>
            	<a href="#">Forgot Password?</a>
            	<input onClick={Signin} className="btn" value="Login"/>
            </form>
            </div>
  )
}

export default Form
