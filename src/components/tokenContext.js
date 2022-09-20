import React from 'react';

const TokenContext=React.createContext({
    token:"",
    handleChangeToken:(value)=>{},
    handleToken:(value)=>{}
})

export default TokenContext;