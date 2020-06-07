import React from 'react'

import './styles.css'
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const HeaderOperations = () =>{
    return (
        <header>
        <img src={require('../../assets/logo.png')} 
                    alt="FakeBank" style={{width: 200, height: 80}}/>
        <Link to="/Dashboard">
            <FiArrowLeft/>
            Voltar para menu
        </Link>

        </header>
    )
}

export default HeaderOperations