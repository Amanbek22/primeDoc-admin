import React from "react";
import css from "./login.module.css";
import {BtnNext, ErrorMessage, LogInput} from "./login-css";
import {Link, useHistory} from "react-router-dom";


export const SignInForm = ( props: any ) => {
    const submit = (e: any) => {
        e.preventDefault()
        props.login('sfsdf', 4)
    }
    return (
        <form onSubmit={submit} className={css.loginWrapper}>
            <LogInput required type={'text'} placeholder={'Введите логин'}/>
            <LogInput required type={'password'} placeholder={'Введите пароль'}/>
            <div className={css.forgot}>
                <Link to={'/forgot'}>забыли пароль?</Link>
            </div>
            <BtnNext>Далее</BtnNext>
        </form>
    )
}


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
            <LogInput required type={'text'} placeholder={'Введите номер телефона'}/>
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
                    <LogInput required type={'number'}/>
                    <LogInput required type={'number'}/>
                    <LogInput required type={'number'}/>
                    <LogInput required type={'number'}/>
                </div>
                <BtnNext >Подтвердить</BtnNext>
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
