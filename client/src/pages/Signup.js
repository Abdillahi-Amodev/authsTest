import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import './Signup.css'
import axios from 'axios'
function Signup() {
const [user,setUser]=useState({username:'',email:'',password:''})
const history=useHistory()



const handleChangeSignup=(e)=>{
    setUser({...user,[e.target.name]:e.target.value})
}

const handleSubmitSignup=async(e)=>{
    e.preventDefault();
    if(user.username !=='' && user.email !=='' && user.password !=='' ){
        try {
            let response=await axios.post('http://localhost:8000/signup',user)
            console.log(response.data);
            history.push('/login')
        } catch (error) {
            console.log(error)
        }
        
        
   }else{
       alert('required')
   }
}


    return (<>
        <div className="signup">
<div className="signup-form">
    <div className="title">
        <h4>Sign Up</h4>
    </div>
<form>
    <input type="text" name="username" value={user.username} onChange={handleChangeSignup}placeholder="Username"/>
                    <input type="email" name="email" value={user.email} onChange={handleChangeSignup} placeholder="email"/>
                    <input type="password" name="password" value={user.password} onChange={handleChangeSignup} placeholder="password"/>
    <button type="submit"  onClick={handleSubmitSignup}>Submit</button>
</form>

</div>
        </div>
    </>
    )
}

export default Signup
