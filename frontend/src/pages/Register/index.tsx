import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react'
import { trackPromise } from 'react-promise-tracker'
import axios from 'axios'

import api from '../../services/api'

import './styles.css'
import Header from '../../components/Header'
import SucessAnSucessNotification from '../../components/SucessAnSucessNotification'

interface formData {
    firstName: string,
    lastName: string,
    cpfCnpj: string,
    email: string,
    account: number,
    password: string
}

interface Uf{
    id:number,
    sigla: string,
    nome: string

}

interface City{
    id: number,
    nome: string
}
const Register = () =>{
    const [sucess, setSucess] = useState(false);
    const [unsucess, setUnSucess] = useState(false);
    const [ufs, setUfs] = useState<Uf[]>([])
    const [citys, setCitys] = useState<City[]>([]);
    const [selectedUf, setSelectedUf] = useState<string>("0");
    const [selectedCity, setSelectedCity] = useState<string>("0");
    const [message, setMessage] = useState('');
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
    }
    async function handleSubmit(event:FormEvent){
        event.preventDefault()
        await trackPromise(
        api.post('/users', formData).then(()=>{
            setSucess(true)
        })
        .catch((error) => {
            setMessage(error.response?.data?.message || 'Ocorrou um erro interno, tente novamente.')
            setUnSucess(true)
        })
        )
    }
    useEffect(()=>{
        trackPromise(
            axios.get<Uf[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderby=nome')
            .then(response => setUfs(response.data))
        )
    }, [])

    useEffect(()=>{
        if (selectedUf === '0'){
            return;
        }
        axios.get<Uf[]>
        (`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios?orderby=nome`)
        .then(response => setCitys(response.data))
    }, [selectedUf])

    function handleSelectUf(event:ChangeEvent<HTMLSelectElement>){
        setSelectedUf(event.target.value)
    }

    function handleSelectCity(event:ChangeEvent<HTMLSelectElement>){
        setSelectedCity(event.target.value)
    }


    return (
        <div id="page-register-account">
            <Header/>
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
                            onChange={handleInputChange}
                            required/>
                        </div>  
                        <div className="field">
                            <label>Sobrenome</label>
                            <input 
                            type='text' 
                            name='lastName' 
                            id='lastName' 
                            onChange={handleInputChange}
                            required/>
                        </div>
                    </div>
                    <div className="field">
                            <label>CPF ou CNPJ</label>
                            <input 
                            type='text'
                             name='cpfCnpj' 
                             id='cpfCnpj' 
                             onChange={handleInputChange}
                             required/>
                        </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                    </legend>
                    <div className="field-group">
                        <div className="field">
                            <label>UF</label>
                            <select name='uf' id='uf' onChange={handleSelectUf} required>
                                <option value={0}>Selecione uma UF</option>
                                {ufs.map(uf=>(
                                    <option key={uf.id} value={uf.sigla}>{uf.nome}</option>
                                ))}
                            </select>
                        </div>  
                        <div className="field">
                            <label>Cidade</label>
                            <select name='city' id='city' onChange={handleSelectCity} required>
                                <option value={0}>Selecione uma cidade</option>
                                {citys.map(city=>(
                                    <option key={city.id} value={city.nome}>{city.nome}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label>Bairro</label>
                            <input type='text' 
                            id='neighborhood' 
                            name='neighborhood'
                            onChange={handleInputChange}
                            required
                            />
                        </div>  
                        <div className="field">
                            <label>Numero</label>
                            <input type='number' 
                            id='number'
                            name='number' 
                            onChange={handleInputChange}
                            required
                            />
                        </div>
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
                            onChange={handleInputChange}
                            required/>
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
                            onChange={handleInputChange}
                            required
                            min={99999}/>
                        </div>
                        <div className='field'>
                            <label>Senha</label>
                            <input type='password'
                            name='password' 
                            id='password' 
                            onChange={handleInputChange}
                            required
                            minLength={6}
                            maxLength={16}/>
                        </div>
                    </div>
                </fieldset>
                <button type='submit'>Cadastrar</button>
            </form>
            <SucessAnSucessNotification 
            messageSucess="Conta criada com sucesso."
            messageUnSucess={message}
            redirectUrlOnSucess="/"
            setSucess={setSucess}
            setUnsuccessfully={setUnSucess}
            sucess={sucess}
            unsuccessfully={unsucess}
            />
        </div>
    )
}

export default Register