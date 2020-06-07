import React from 'react'
import LoadingIndicator from '../../components/LoadingIndicator'
import HeaderOperations from '../../components/HeaderOperations'

import './styles.css'

const Withdraw = () =>{
    return (
        <div id='page-withdraw'>
        <LoadingIndicator/>
            <HeaderOperations/>
            <form>
                <h2>Saque</h2>
                <fieldset>
                    <div className="field">
                        <label>Valor: </label>
                        <input type="number" name="value" id="value" required min={0}/>
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label>Conta: </label>
                            <input type="number" id="account" name="account" required min={0}/>
                        </div>
                        <div className="field">
                            <label>Senha: </label>
                            <input type="text" id="password" name="password" required/>
                        </div>
                    </div>
                </fieldset>
                <button>Sacar</button>
            </form>

        </div>

    )
}

export default Withdraw