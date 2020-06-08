import React, { useState, ChangeEvent, FormEvent } from 'react'
import LoadingIndicator from '../../components/LoadingIndicator'
import HeaderOperations from '../../components/HeaderOperations'
import SucessAnSucessNotification from '../../components/SucessAnSucessNotification'



import './styles.css'
import api from '../../services/api'
import { trackPromise } from 'react-promise-tracker'

interface formData {
    account:number,
    password:string,
    value:number
}

const Withdraw = () =>{
    const user_id = localStorage.getItem('id')
    const [madeWithdraw, setMadeWithdraw] = useState(false);
    const [notMadeWithdraw, setNotMadeWithdraw] = useState(false);
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        account:0,
        password:'',
        value:0
    });

    function handleInputChange(event:ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target
        setFormData({...formData, [name]: value})
    }
    async function makeWithdraw():Promise<void>{
        const response = await api.get(`/users/${user_id}`)
        const {balance} = response.data
        if (Number(balance) >= Number(formData.value)){
            api.post(`users/${user_id}/withdraw`, formData)
            .then(()=>setMadeWithdraw(true))
            .catch((response)=>{
                setMessage("Conta e/ou senha invalidas.")
                setNotMadeWithdraw(true)});
        }else{
            setMessage('Saldo insuficiente.')
            setNotMadeWithdraw(true)
        }
    }

    function handleSubmit(event:FormEvent){
        
        event.preventDefault()
        trackPromise(
            makeWithdraw()
            )
        }
    return (
        <div id='page-withdraw'>
        <LoadingIndicator/>
            <HeaderOperations/>
            <form onSubmit={handleSubmit}>
                <h2>Saque</h2>
                <fieldset>
                    <div className="field">
                        <label>Valor: </label>
                        <input type="number" name="value" id="value" onChange={handleInputChange} required min={0}/>
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label>Conta: </label>
                            <input type="number" id="account" name="account" onChange={handleInputChange} required min={0}/>
                        </div>
                        <div className="field">
                            <label>Senha: </label>
                            <input type="password" id="password" name="password" onChange={handleInputChange} required/>
                        </div>
                    </div>
                </fieldset>
                <button type='submit'>Sacar</button>
            </form>
            <SucessAnSucessNotification 
            messageSucess="Saque Realizado com sucesso."
            messageUnSucess={message}
            redirectUrlOnSucess="/dashboard"
            setSucess={setMadeWithdraw}
            setUnsuccessfully={setNotMadeWithdraw}
            sucess={madeWithdraw}
            unsuccessfully={notMadeWithdraw}
            />
        </div>

    )
}

export default Withdraw