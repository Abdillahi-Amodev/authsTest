import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import {getLocalStorage} from './storage'
function ProtectedRoute({component:Component,...rest}) {
    const isAuth = () => !!getLocalStorage('login');

    return (
        <Route
        {...rest}
        render={(props)=>{
            if (isAuth()){
                return <Component {...props} />
            }else{
               return <Redirect to='/login'/>

            }

          }}
        
        
        />
       
    )
}

export default ProtectedRoute
