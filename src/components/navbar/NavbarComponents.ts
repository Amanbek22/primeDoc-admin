import styled from 'styled-components'

export const LogoWrapper = styled.div`
    text-align: center;
    margin: 25px auto;
`

export const Navbar = styled.div`
    width: 265px;
    background: #00BDD0;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
`

export const LinksWrapper = styled.div`
    display: grid;
    margin-left: 25px;
    background: linear-gradient(to right, #00BDD0, #fff);
    
    a,span{
        padding: 10px 0 10px 25px;
        font-size: 16px;
        background: #00BDD0;
        display: flex;
        align-items: center;
        color: #FFFFFF;
    }
    a>img{
        margin-right: 5px;
    }
    a:hover{
            background: #21a7b4;
            border-top-left-radius: 25px;
            border-bottom-left-radius: 25px;
        }
`
