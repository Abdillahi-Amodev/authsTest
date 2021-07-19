import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { LocalStorage} from './storage'
import './Login.css'
import { useHistory } from 'react-router-dom'

function Login() {
    const [state, setState] = useState({ username: '',  password: '' })
    const [error,setError]=useState('')
    const [isError,setIsError]=useState(false)
    const history = useHistory()

    useEffect(()=>{
        let time= setTimeout(()=>{
            setIsError(false);
             
        },3000)

        return ()=>{
            clearInterval(time)
        }

    },[isError])


    
    const handleChangeLogin = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }



    const handleSubmitLogin =async(e) => {
        e.preventDefault();
        if (state.username !== ''  &&  state.password !== '') {
                  try {
                      let response= await axios.post('http://localhost:8000/login',state)
                      LocalStorage('login',response.data.token)
                      history.push('/')
                      console.log(" log In > ",response.data);
                      setState({username:'',password:''})
                  } catch (error) {
                      console.log(error.response.data.msg);
                      setIsError(true);
                      setError(error.response.data.msg)
                    }
                    
                } else {
                    
                    setIsError(true);
            setError('required')
        }
    }


    return (
        <>
        <div className="login">
                <div className="login-form">
                    <div className={`${isError?'title':''}`}>
                       <p>{isError ? error :''}</p>
                    </div>
                    <form>
                        <input type="text" name="username" value={state.username} onChange={handleChangeLogin} placeholder="Username" />
                       
                        <input type="password" name="password" value={state.password} onChange={handleChangeLogin} placeholder="password" />
                        <button type="submit" onClick={handleSubmitLogin} >Submit</button>
                    </form>

            <Link to='/signup'>Sign up </Link>
                </div>
        </div>
        </>
    )
}

export default Login
