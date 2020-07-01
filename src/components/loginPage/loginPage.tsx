import React from 'react'
import {LoginWrapper, BlueBlock, LoginFormWrapper} from "./login-css";
import logo from '../../img/logo.png'
import css from './login.module.css'
import {Link} from "react-router-dom";

const LoginPage = (props:any) => {

    return(
        <LoginWrapper>
            <LoginFormWrapper>
                <div className={css.logoWrapper}>
                    <Link to={'/'}>
                    <img src={logo} alt="PDOC"/>
                    </Link>
                </div>
                <div className={css.welcome}>WElCOME</div>
                {props.children}
            </LoginFormWrapper>
            <BlueBlock />
        </LoginWrapper>
    )
}




export default LoginPage
