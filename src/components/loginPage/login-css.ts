import styled from 'styled-components'


export const LoginWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100vh;
`


export const BlueBlock = styled.div`
    background: #00BDD0;
`


export const LoginFormWrapper = styled.div`
    width: 400px;
    margin: 8% auto 0 auto;
`

export const LogInput = styled.input`
    background: #F8F8F8;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    border-radius: 5px;
    width: 100%;
    height: 36px;
    
    padding: 0 0 0 9px;
    font-family: 'Balsamiq Sans', cursive;
    font-weight: 200;
    font-size: 14px;
    line-height: 16px;
    display: flex;
    align-items: center;
    color: rgba(0, 0, 0, 0.5);
`
export const BtnNext = styled.button`
    width: 100%;
    height: 50px;
    font-family: 'Balsamiq Sans', cursive;
    
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
    border: none;
    cursor: pointer;
    background: #00BDD0;
    border-radius: 10px;
    
    :focus{
        outline: none;
    }
`

export const ErrorMessage = styled.div`
    font-family: 'Balsamiq Sans', cursive;
    font-style: normal;
    font-weight: bold;
    font-size: 22px;
    line-height: 29px;
    
    color: #ED5168;

`
