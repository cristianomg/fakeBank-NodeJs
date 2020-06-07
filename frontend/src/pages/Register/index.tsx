import React, {useState, ChangeEvent, FormEvent} from 'react'
import {useHistory} from 'react-router-dom'
import LoadingIndicator from '../../components/LoadingIndicator'
import { trackPromise } from 'react-promise-tracker'

import api from '../../services/api'

import './styles.css'
import Header from '../../components/Header'

interface formData {
    firstName: string,
    lastName: string,
    cpfCnpj: string,
    email: string,
    account: number,
    password: string
}
const Register = () =>{
    const history = useHistory();
    const [formData, setFormData] = useState<formData>(
        {   firstName: '',
            lastName: '',
            cpfCnpj: '',
            email: '',
            account: 0,
            password: ''}
    );
    function handleInputChange(event:ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target
        setFormData({...formData, [name]: value})
        console.log(formData)
    }
    async function handleSubmit(event:FormEvent){
        event.preventDefault()
        console.log(formData)
        await trackPromise(
        api.post('/users', formData).then(()=>{
            alert('Conta criada com sucesso.')
            history.push('/')
        })
        .catch((response) => {
            alert('Erro ao criar conta, tente novamente.')
        })
        )
    }
    return (
        <div id="page-register-account">
            <Header/>
            <LoadingIndicator/>
            <form onSubmit={handleSubmit}>
                <h1>Cadastrar nova conta</h1>
                <fieldset>
                    <legend>
                        <h2>Dados pessoais</h2>
                    </legend>
                    <div className="field-group">
                        <div className="field">
                            <label>Nome</label>
                            <input type='text' 
                            name='firstName' id='firstName' 
                            onChange={handleInputChange}/>
                        </div>  
                        <div className="field">
                            <label>Sobrenome</label>
                            <input 
                            type='text' 
                            name='lastName' 
                            id='lastName' 
                            onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className="field">
                            <label>CPF ou CNPJ</label>
                            <input 
                            type='text'
                             name='cpfCnpj' 
                             id='cpfCnpj' 
                             onChange={handleInputChange}/>
                        </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>
                            Dados para contato
                        </h2>
                    </legend>
                        <div className="field">
                            <label>E-MAIL</label>
                            <input 
                            type='email' 
                            name='email'
                            id='email'
                            onChange={handleInputChange}/>
                        </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Dados da conta</h2>
                    </legend>
                    <div className='field-group'>
                        <div className='field'>
                            <label>Conta</label>
                            <input
                            type='number' 
                            name='account' 
                            id='account' 
                            onChange={handleInputChange}/>
                        </div>
                        <div className='field'>
                            <label>Senha</label>
                            <input type='password'
                            name='password' 
                            id='password' 
                            onChange={handleInputChange}/>
                        </div>
                    </div>
                </fieldset>
                <button type='submit'>Cadastrar</button>
            </form>
        </div>
    )
}

export default Register