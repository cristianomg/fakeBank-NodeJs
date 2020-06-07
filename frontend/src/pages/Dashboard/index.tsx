import React from 'react'
import { Redirect, useHistory} from 'react-router-dom';
import Header from '../../components/Header';

import './styles.css'

import {MdLocalAtm, MdTrendingUp, MdTrendingDown, MdSwapHoriz} from 'react-icons/md'

const Dashboard = () =>{
    const history = useHistory();
    const isAuth = localStorage.getItem('isAuth')
    if (!isAuth){
        return <Redirect to='/'/>
    }
    return (
        <div id='page-dashboard'>
            <Header/>
            <ul className='items-grid'>
                <li 
                    onClick={()=> history.push('/balance')}>
                    <img src='' alt=''></img>
                    <MdLocalAtm size={60}/>
                    <span>Saldo</span>
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