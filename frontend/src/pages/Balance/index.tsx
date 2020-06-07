import React, {useEffect, useState} from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import HeaderOperations from '../../components/HeaderOperations'
import api from '../../services/api'

import './styles.css'
import { trackPromise } from 'react-promise-tracker'
import LoadingIndicator from '../../components/LoadingIndicator'

interface User {
    firstName: string,
    lastName: string,
    cpfCnpj: string,
    email: string,
    account: number,
    flActive: boolean,
    balance: number,
    transactions: Transaction[]
}
interface Transaction{
    "id": number,
    "operation": string,
    "userId": number,
    "value": number,
    "createdAt": string,
    "updatedAt": string
}

const Balance = () =>{
    const history = useHistory()
    const isAuth = localStorage.getItem('isAuth')
    const user_id = localStorage.getItem('id')
    const [user, setUser] = useState<User>({
        firstName: '',
        lastName: '',
        cpfCnpj: '',
        email: '',
        account: 0,
        flActive: false,
        balance: 0,
        transactions: []
    });    
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    function parseOperation(operation:string){
        switch(operation){
            case 'DEPOSIT':
                return 'Depósito'
            case 'WITHDRAW':
                return 'Saque'

        }
    }
    function parseDate(date: string){
        const newDate = new Date(Date.parse(date)).toLocaleDateString('br')
        return newDate
    }

    function parseHour(date: string){
        const newHour = new Date(Date.parse(date)).toLocaleTimeString('br')
        return newHour
    }



    useEffect(() => {
        async function loadUser(){
            api.get(`/users/${user_id}`)
            .then(response=>{setUser(response.data)})
            .catch(()=>history.push('/'))
        }
        async function loadTransactions(){
            api.get(`/users/${user_id}/transactions`)
            .then(response=>setTransactions(response.data))
            .catch(()=>history.push('/'))
        } 
        trackPromise(
            loadUser()
        );
        trackPromise(loadTransactions())
    }, [history, user_id]);

    if (!isAuth){
        return <Redirect to="/"/>
    }
    return (
        <div id='page-balance'>
            <HeaderOperations/>
            <div className="container">
                <LoadingIndicator/>
                <h1>Saldo: {Number(user.balance).toFixed(2)}</h1>
                {transactions.length > 0 ? 
                <table>
                    <thead>
                        <tr>
                            <td>
                                Operação
                            </td>
                            <td>
                                Valor
                            </td>
                            <td>
                                Data
                            </td>
                            <td>
                                Horário
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                    {transactions.map(transactions => (
                        <tr>
                            <td>
                                {parseOperation(transactions.operation)}
                            </td>
                            <td>R$: {Number(transactions.value).toFixed(2)}</td>
                            <td>{parseDate(transactions.createdAt)}</td>
                            <td>{parseHour(transactions.createdAt)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                :
                <p>Nenhum transação realizada.</p>}

            </div>

        </div>

    )
}

export default Balance