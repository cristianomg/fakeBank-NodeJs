import React, { ChangeEvent, useState, FormEvent } from 'react'
import { FiLogIn } from 'react-icons/fi'


import './styles.css'
import api from '../../services/api'
import { trackPromise } from 'react-promise-tracker'
import Header from '../../components/Header'
import SucessAnSucessNotification from '../../components/SucessAnSucessNotification'
import { useHistory } from 'react-router-dom'

interface Login {
    email: string,
    senha: string
}

const Login = () =>{
    const history = useHistory();
    const [sucess, setSucess] = useState(false)
    const [unSucess, setUnSucess] = useState(false)
    const [message, setMessage] = useState('')
    const [formLogin, setFormLogin] = useState({
        email: '',
        password: ''
    });
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
                setSucess(true)
                setMessage('Login realizado com sucesso.')
                history.push('/dashboard')
            })
            .catch((error)=>{
                console.log(error.response)
                localStorage.clear()
                setUnSucess(true)
                setMessage(error?.response?.data?.message || 'Ocorrou um erro interno, tente novamente.')
            })   
        )
    }

    return (
        <div id='page-login'>
            <Header/>
            <form onSubmit={handleSubmit}>
                <h1>Faça seu login</h1>
                <fieldset>
                    <div className="field">
                        <label>E-MAIL</label>
                        <input type='email' name='email' id='email' onChange={handleInputChange} required/>
                    </div>
                    <div className='field'>
                        <label>SENHA</label>
                        <input type='password' name='password' id='password' onChange={handleInputChange} required/>
                    </div>
                </fieldset>
                <button type='submit'>
                    <span><FiLogIn/></span>
                    <strong>Entrar</strong>
                </button>
            </form>

            <SucessAnSucessNotification 
            messageSucess={message}
            messageUnSucess={message}
            setSucess={setSucess}
            setUnsuccessfully={setUnSucess}
            sucess={sucess}
            unsuccessfully={unSucess}
            />

        </div>
    )
}

export default Login