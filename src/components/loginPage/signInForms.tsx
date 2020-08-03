import React, {useState} from "react";
import css from "./login.module.css";
import {BtnNext, ErrorMessage, LogInput} from "./login-css";
import {Link, useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {authFc} from "../../state/authReducer";
import ReactCodeInput from "react-verification-code-input/dist";
import {Form, Formik} from "formik";
import * as Yup from 'yup';
import deepEqual from 'lodash.isequal';


const validateFormik = {
    login: Yup.string()
        .required('Объязательное поле'),
    password: Yup.string()
        .min(8, 'Минимум 8 символов')
        .required('Объязательное поле'),


}

const SignInFormik = (props: any) => {
    const [error, setError] = useState(false)
    return (
        <Formik
            initialValues={{
                login: '',
                password: ''
            }}
            validationSchema={Yup.object().shape(validateFormik)}
            onSubmit={(values, {setSubmitting}) => {
                setSubmitting(true);
                props.authFc(values.password, values.login)
                    .then((res: any) => {
                        console.log(res)
                        setError(!res)
                        setSubmitting(false)
                    })
            }}
        >
            {
                ({
                     values,
                     touched,
                     errors,
                     initialValues,
                     isSubmitting,
                     handleChange,
                     handleBlur,
                 }) => {
                    const hasChanged = !deepEqual(values, initialValues);
                    const hasErrors = Object.keys(errors).length > 0;
                    return <Form className={css.loginWrapper}>
                        {
                            error ? <div className={css.error}>Пароль или логин введен не верно.</div>
                                : null
                        }
                        <div>
                            {touched.login && errors.login && <div className={css.error}>{errors.login}</div>}
                            <LogInput type={'text'}
                                      value={values.login}
                                      id="login"
                                      name="login"
                                      autoComplete={'false'}
                                      onChange={(e) => {
                                          handleChange(e)
                                          setError(false)
                                      }}
                                      onBlur={handleBlur}
                                      className={
                                          hasChanged ? errors.login ? css.error : css.success : ('')
                                      }
                                      placeholder={'Введите логин'}
                            />
                        </div>
                        <div>
                            {touched.password && errors.password && <div className={css.error}>{errors.password}</div>}
                            <LogInput type={'password'}
                                      value={values.password}
                                      id="password"
                                      name="password"
                                      autoComplete={'false'}
                                      onChange={(e) => {
                                          handleChange(e)
                                          setError(false)
                                      }}
                                      onBlur={handleBlur}
                                      className={
                                          hasChanged ? errors.password ? (
                                              css.error
                                          ) : (
                                              css.success
                                          ) : (
                                              ''
                                          )
                                      }
                                      placeholder={'Введите пароль'}
                            />
                        </div>
                        <div className={css.forgot}>
                            <Link to={'/forgot'}>забыли пароль?</Link>
                        </div>
                        <BtnNext type="submit" disabled={!hasChanged || hasErrors || isSubmitting}>
                            Далее
                        </BtnNext>

                    </Form>
                }}
        </Formik>
    )
}

export const SignInForm = connect(null, {authFc})(SignInFormik)

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
