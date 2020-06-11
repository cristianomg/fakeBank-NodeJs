import React from 'react';
import Loader from 'react-loader-spinner';
import { usePromiseTracker } from "react-promise-tracker";
import ReactModal from 'react-modal'



const LoadingIndicator = () => {
    const { promiseInProgress} = usePromiseTracker();
    if (promiseInProgress){
        return (
<ReactModal  isOpen={true} style={{content: 
{
    backgroundColor: 'transparent',
    borderColor: 'transparent'
}}}>
    <div
        style={{
            position: "absolute",
            left: "50%",
            top: "30%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column-reverse",
            overflow: 'hidden'
            }}
        >
        <strong style={{
            fontSize: "15px",
            color: "#07004d",
        }}>Carregando...</strong>
        <Loader type="Audio" color="#2d82b7" height={100} width={100} />     
  
    </div>
</ReactModal>
        
        )
    }
    else{
        return (<div></div>)
    }
}


export default LoadingIndicator;