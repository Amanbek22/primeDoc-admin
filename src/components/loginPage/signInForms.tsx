import React, {useState} from "react";
import css from "./login.module.css";
import {BtnNext, ErrorMessage, LogInput} from "./login-css";
import {Link, useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {authFc} from "../../state/authReducer";
import {useAuth} from "../../hooks/auth.hook";
import ReactCodeInput from "react-verification-code-input/dist";

const SignIn = ( props: any ) => {
    const {login} = useAuth()
    const [loginInp, setLoginInp] = useState('')
    const [password, setPassword] = useState('')
    const log = async (password: string, log: string) => {
        const res = await props.authFc(password, log)
        console.log(res)
        login(res.refresh, 5)
    }
    const submit = (e: any) => {
        e.preventDefault()
        log(password,loginInp)
    }
    return (
        <form onSubmit={submit} className={css.loginWrapper}>
            <LogInput required type={'text'} value={loginInp} onChange={(e:any)=> setLoginInp(e.target.value)} placeholder={'Введите логин'}/>
            <LogInput required type={'password'} value={password} onChange={(e:any)=> setPassword(e.target.value) } placeholder={'Введите пароль'}/>
            <div className={css.forgot}>
                <Link to={'/forgot'}>забыли пароль?</Link>
            </div>
            <BtnNext>Далее</BtnNext>
        </form>
    )
}
export const SignInForm = connect(null,{authFc})(SignIn)

export const ForgotPassword = () => {
    const history = useHistory()
    const submit = (e: any) => {
        e.preventDefault()
        return history.push('/code')
    }
    return (
        <form onSubmit={submit} className={css.loginWrapper}>
            <ErrorMessage>
                Восстановление пароля
            </ErrorMessage>
            <LogInput required type={'email'} placeholder={'Введите email'}/>
            <BtnNext>Отправить код</BtnNext>
        </form>
    )
}

export const EnterCode = () => {
    const history = useHistory()
    const submit = (e: any) => {
        e.preventDefault()
        return history.push('/new-password')
    }
    return (
        <form onSubmit={submit} className={css.loginWrapper}>
            <ErrorMessage>
                Код подтверждения
            </ErrorMessage>
            <div className={css.codesWrapper}>
                <p>
                    Введите код, который был отправлен
                    на ваш номер телефона
                </p>
                <div className={css.codes}>
                    <ReactCodeInput className={css.codeVerification} fields={4}  onChange={(e)=> console.log(e)} />
                </div>
                <BtnNext>Подтвердить</BtnNext>
            </div>
        </form>
    )
}


export const NewPassword = () => {
    const history = useHistory()
    const submit = (e: any) => {
        e.preventDefault()
        return history.push('/')
    }
    return (
        <form onSubmit={submit} className={css.loginWrapper}>
            <ErrorMessage>
                Изменения пароля
            </ErrorMessage>
            <LogInput required type={'password'} placeholder={'Введите новый пароль'}/>
            <LogInput required type={'password'} placeholder={'Подвердите пароль'}/>
            <BtnNext >ПОДВЕРДИТЬ</BtnNext>
        </form>
    )
}
