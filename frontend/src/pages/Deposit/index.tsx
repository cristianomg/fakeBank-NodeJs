import React, { ChangeEvent, FormEvent, useState } from 'react'
import LoadingIndicator from '../../components/LoadingIndicator'
import HeaderOperations from '../../components/HeaderOperations'

import './styles.css'
import api from '../../services/api'
import { trackPromise } from 'react-promise-tracker'
import { useHistory } from 'react-router-dom'
import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

interface formData {
    account:number,
    password:string,
    value:number
}

const Deposit = () =>{
    const user_id = localStorage.getItem('id')
    const history = useHistory();
    const [message, setMessage] = useState('');
    const [madeDeposit, setMadeDeposit] = useState(false);
    const [notMadeDeposit, setNotMadeDeposit] = useState(false);
    const [formData, setFormData] = useState({
            account:0,
            password:'',
            value:0
    })
    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target
        setFormData({...formData, [name]: value})
    }    

    function handleSubmit(event: FormEvent){
        event.preventDefault()
        trackPromise(
            api.post(`users/${user_id}/deposit`, formData)
            .then(()=>setMadeDeposit(true))
            .catch(()=>{
                setMessage("Conta e/ou senha invalidas.")
                setNotMadeDeposit(true)})
            )
        }
    function madeMsgSucess(){
        setMadeDeposit(false)
        history.push('/dashboard')
    }
    return (
        <div id='page-deposit'>
        <LoadingIndicator/>
            <HeaderOperations/>
            <form onSubmit={handleSubmit}>
                <h2>Depósito</h2>
                <fieldset>
                    <div className="field">
                        <label htmlFor="value">Valor: </label>
                        <input type="number" name="value" id="value" required min={0}
                        onChange={handleInputChange}/>
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="account">Conta: </label>
                            <input type="number" id="account" name="account" required min={0}
                            onChange={handleInputChange}/>
                        </div>
                        <div className="field">
                            <label htmlFor="password">Senha: </label>
                            <input type="password" id="password" name="password" required
                            onChange={handleInputChange}/>      
                        </div>
                    </div>
                </fieldset>
                <button type='submit'>Depositar</button>
            </form>
            <Snackbar open={madeDeposit} autoHideDuration={3000} onClose={()=>madeMsgSucess()}>
                <Alert onClose={()=>setMadeDeposit(false)} severity="success">
                    Depósito Realizado com sucesso.
                </Alert>
            </Snackbar>
            <Snackbar open={notMadeDeposit} autoHideDuration={3000} onClose={()=>setNotMadeDeposit(false)}>
                <Alert onClose={()=>setNotMadeDeposit(false)} severity="error">
                    {message}
                </Alert>
            </Snackbar>
        </div>

    )
}

export default Deposit