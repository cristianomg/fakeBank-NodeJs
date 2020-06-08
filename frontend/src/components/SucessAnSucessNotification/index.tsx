import React from 'react'
import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import {useHistory} from 'react-router-dom'

interface Props {
    sucess: boolean
    setSucess: funcao
    redirectUrlOnSucess?: string 
    unsuccessfully: boolean
    setUnsuccessfully: funcao
    messageSucess: string
    messageUnSucess: string
}

interface funcao {
    (key: boolean): void
}


const SucessAnSucessNotification: React.FC<Props> = (props: Props) =>{
    const history = useHistory();
    function madeSucess(){
        props.setSucess(false)
        if(props.redirectUrlOnSucess){
            history.push(props.redirectUrlOnSucess)
        }
    }
    return (
        <>
            <Snackbar open={props.sucess} autoHideDuration={3000} onClose={madeSucess}>
                <Alert onClose={()=> props.setSucess(false)} severity="success">
                    {props.messageSucess}
                </Alert>
            </Snackbar>
            <Snackbar open={props.unsuccessfully} autoHideDuration={3000} onClose={()=>props.setUnsuccessfully(false)}>
                <Alert onClose={()=>props.setUnsuccessfully(false)} severity="error">
                    {props.messageUnSucess}
                </Alert>
            </Snackbar>
        </>
    )
}

export default SucessAnSucessNotification