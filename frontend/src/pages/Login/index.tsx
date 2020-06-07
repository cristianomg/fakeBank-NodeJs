import React, { ChangeEvent, useState, FormEvent } from 'react'
import { FiLogIn } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import LoadingIndicator from '../../components/LoadingIndicator'


import './styles.css'
import api from '../../services/api'
import { trackPromise } from 'react-promise-tracker'
import Header from '../../components/Header'

interface Login {
    email: string,
    senha: string
}

const Login = () =>{
    const [formLogin, setFormLogin] = useState({
        email: '',
        password: ''
    });

    const history = useHistory()

    function handleInputChange(event:ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target
        setFormLogin({...formLogin, [name]: value})
    }
    
    function handleSubmit(event: FormEvent){
        event.preventDefault()
        console.log(formLogin)
        trackPromise(
            api.post('session/login', formLogin)
            .then((response)=>{
                console.log(response.data)
                const {id, firstName, lastName,
                       account, password, cpfCnpj, email,
                       flActivate} = response.data
                localStorage.setItem('isAuth', 'true')
                localStorage.setItem('id', id)
                localStorage.setItem('firstName', firstName)
                localStorage.setItem('lastName', lastName)
                localStorage.setItem('account', account)
                localStorage.setItem('password', password)
                localStorage.setItem('cpfCnpj', cpfCnpj)
                localStorage.setItem('email', email)
                localStorage.setItem('flActivate', flActivate)
                history.push('/Dashboard')
            })
            .catch((response)=>{
                console.log(response)
                localStorage.clear()
                alert('Erro ao fazer login')
            })   
        )
    }

    return (
        <div id='page-login'>
            <Header/>
            <LoadingIndicator/>
            <form onSubmit={handleSubmit}>
                <h1>Faça seu login</h1>
                <fieldset>
                    <div className="field">
                        <label>E-MAIL</label>
                        <input type='email' name='email' id='email' onChange={handleInputChange}/>
                    </div>
                    <div className='field'>
                        <label>SENHA</label>
                        <input type='password' name='password' id='password' onChange={handleInputChange}/>
                    </div>
                </fieldset>
                <button type='submit'>
                    <span><FiLogIn/></span>
                    <strong>Entrar</strong>
                </button>
            </form>

        </div>
    )
}

export default Login