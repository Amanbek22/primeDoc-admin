import React, {useState} from "react";
import css from "./login.module.css";
import {BtnNext, ErrorMessage, LogInput} from "./login-css";
import {Link, useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {authFc} from "../../state/authReducer";
import {useAuth} from "../../hooks/auth.hook";
import ReactCodeInput from "react-verification-code-input/dist";
import {useFormik} from "formik";

const validate = (values: any) => {
    const errors: any = {};
    if (!values.login) {
        errors.login = 'Объязательное поле';
    } else if (!values.password) {
        errors.password = 'Объязательно поле';
    } else if (values.password.length < 8) {
        errors.password = 'Минимум 8 символов'
    }

    return errors;
};


const SignIn = (props: any) => {
    const {login} = useAuth()
    const log = async (password: string, log: string) => {
        const res = await props.authFc(password, log)
        login(res.refresh, 5)
    }
    const formik = useFormik({
        initialValues: {
            login: '',
            password: ''
        },
        validate,
        onSubmit: (values: any) => {
            log(values.password, values.login)
        },
    });
    return (
        <form onSubmit={formik.handleSubmit} className={css.loginWrapper}>
            <div>
                {formik.errors.login ? <div className={css.error}>{formik.errors.login}</div> : null}
                <LogInput type={'text'}
                          value={formik.values.login}
                          id="login"
                          name="login"
                          onChange={formik.handleChange}
                          placeholder={'Введите логин'}
                />
            </div>
            <div>
                {formik.errors.password ? <div className={css.error}>{formik.errors.password}</div> : null}
                <LogInput
                id={'password'}
                name={'password'}
                type={'password'}
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder={'Введите пароль'}
            />
            </div>
            <div className={css.forgot}>
                <Link to={'/forgot'}>забыли пароль?</Link>
            </div>
            <BtnNext>Далее</BtnNext>
        </form>
    )
}
export const SignInForm = connect(null, {authFc})(SignIn)

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
                    <ReactCodeInput className={css.codeVerification} fields={4} onChange={(e) => console.log(e)}/>
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
            <BtnNext>ПОДВЕРДИТЬ</BtnNext>
        </form>
    )
}
