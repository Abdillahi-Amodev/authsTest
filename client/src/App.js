import React from 'react'
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProtectedRoute from './pages/ProtectedRoute'
function App() {
    return ( 
<Router>

    <Switch>
    <ProtectedRoute exact path='/' component={Home}/>
    

    <Route exact path='/login'>
        <Login/>
    </Route>
    
  <Route exact path='/signup'>
        <Signup/>
     </Route>
    </Switch>

</Router>
        
    )
}

export default App
