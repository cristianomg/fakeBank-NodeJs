import React, {useEffect, useState} from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import HeaderOperations from '../../components/HeaderOperations'
import api from '../../services/api'

import './styles.css'
import { trackPromise } from 'react-promise-tracker'
import {Table, TableHead, TableRow, TableCell, TableBody, TableContainer} from '@material-ui/core'

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
    const [qtdMovimentosPage, setQtdMovimentosPage] = useState(5)
 
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
    
    function handleAddMoreTransactionsOnList(){
        setQtdMovimentosPage(qtdMovimentosPage + 5);
    }

    useEffect(() => {
        async function loadTransactions(){
            api.get(`/users/${user_id}/transactions`)
            .then(response=>setTransactions(response.data))
            .catch(()=>history.push('/'))
        }
        trackPromise(loadTransactions())
    }, [history, user_id]);

    if (!isAuth){
        return <Redirect to="/"/>
    }
    return (
        <div id='page-balance'>
            <HeaderOperations/>
            <div className="container">
                <h1>Extrato</h1>
                {transactions.length > 0 ? 
                <div>
                    <TableContainer>
                        <Table >
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Operação</TableCell>
                                    <TableCell align="center">Valor</TableCell>
                                    <TableCell align="center">Data</TableCell>
                                    <TableCell align="center">Horário</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactions.slice(0, qtdMovimentosPage).map(transaction => (
                                    <TableRow key={transaction.id}>
                                        <TableCell align="center">{parseOperation(transaction.operation)}</TableCell>
                                        <TableCell align="center">R$: {Number(transaction.value).toFixed(2)}</TableCell>
                                        <TableCell align="center">{parseDate(transaction.createdAt)}</TableCell>
                                        <TableCell align="center">{parseHour(transaction.createdAt)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className='btn-pagination'>
                                    <button onClick={handleAddMoreTransactionsOnList}><span>Carregar mais</span></button>

                                </div>
                    </TableContainer>
                </div>
                :
                <p>Nenhum transação realizada.</p>}

            </div>

        </div>

    )
}

export default Balance