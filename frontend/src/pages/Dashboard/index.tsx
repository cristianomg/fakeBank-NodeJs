import React, { useState, useEffect } from 'react'
import { Redirect, useHistory} from 'react-router-dom';
import Header from '../../components/Header';

import './styles.css'

import {MdLocalAtm, MdTrendingUp, MdTrendingDown, MdSwapHoriz} from 'react-icons/md'
import { trackPromise } from 'react-promise-tracker';
import api from '../../services/api';
interface User {
    firstName: string,
    lastName: string,
    cpfCnpj: string,
    email: string,
    account: number,
    flActive: boolean,
    balance: number,
}
const Dashboard = () =>{
    const history = useHistory();
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        cpfCnpj: '',
        email: '',
        account: 0,
        flActive: false,
        balance: 0,
    });
    const isAuth = localStorage.getItem('isAuth')
    const user_id = localStorage.getItem('id')
    useEffect(()=>{
        trackPromise(api.get(`users/${user_id}`)
        .then((response)=>setUser(response.data)))
    }, [user_id])

    function formatName(name:string){
        return name.replace(name.charAt(0), name.charAt(0).toUpperCase())
    }


    if (!isAuth){
        return <Redirect to='/'/>
    }
    return (
        <div id='page-dashboard'>
            <Header/>
    <div className='title'><h1>Ola, {formatName(user.firstName)} {formatName(user.lastName)}. Seu saldo é R$ {Number(user.balance).toFixed(2)}.</h1></div>
            <ul className='items-grid'>
                <li 
                    onClick={()=> history.push('/balance')}>
                    <img src='' alt=''></img>
                    <MdLocalAtm size={60}/>
                    <span>Extrato</span>
                </li> 
                <li 
                    onClick={()=> history.push('/withdraw')}>
                    <img src='' alt=''></img>
                    <MdTrendingUp size={60}/>
                    <span>Saque</span>
                </li>
                <li 
                    onClick={()=> history.push('/deposit')}>
                    <MdTrendingDown size={60}/>
                    <span>Depósito</span>
                </li>
                <li 
                    onClick={() => history.push('/balance')}>
                    <MdSwapHoriz size={60}/>
                    <span>Transferência</span>
                </li>
            </ul>

        </div>
    )
}

export default Dashboard