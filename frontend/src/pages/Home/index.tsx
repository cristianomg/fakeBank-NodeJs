import React from 'react'
import {Link } from 'react-router-dom'
import { FiLogIn} from 'react-icons/fi'
import { MdAssignmentInd } from 'react-icons/md'
import './styles.css'

const Home = () =>{
    localStorage.clear()
    return (
            <div id="page-home">
                <div className="content">
                    <header>
                        <img src={require('../../assets/logo.png')} 
                        alt="FakeBank" style={{width: 200, height: 80}}/>
                    </header>
                    <main>
                        <h1>Seu banco digital para pequenas operações</h1>
                        <p>
                            Ajudamos pessoas que procuram um banco simples para fazer operações de deposito e saque
                        </p>
                        <Link to="/Login">
                            <span>
                                <FiLogIn/>
                            </span>
                            <strong>Entrar</strong>
                        </Link>
                        <Link to="/Register">
                            <span>
                                <MdAssignmentInd/>
                            </span>
                            <strong>Criar nova conta</strong>
                        </Link>
                    </main>
                </div>
            </div>
        )
    }

export default Home