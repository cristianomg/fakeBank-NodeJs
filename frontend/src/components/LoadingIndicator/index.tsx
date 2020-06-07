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
            margin: "20px",
            width: "100%",
            height: "100",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column-reverse"
            }}
        >
        <strong style={{
            fontSize: "15px",
            color: "#2d82b7",
        }}>Carregando</strong>
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