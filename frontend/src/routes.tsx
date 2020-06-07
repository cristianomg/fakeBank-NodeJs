import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Balance from './pages/Balance'
import Withdraw from './pages/Withdraw'
import Deposit from './pages/Deposit'
const Routes = () => {
    return (
        <BrowserRouter>
        <Route exact path="/" component={Home}/>
        <Route path="/Register" component={Register}/>
        <Route path="/Login" component={Login}/>
        <Route path="/Dashboard" component={Dashboard}/>
        <Route path="/Balance" component={Balance}/>
        <Route path="/Withdraw" component={Withdraw}/>
        <Route path="/Deposit" component={Deposit}/>
        </BrowserRouter>
    )
}

export default Routes