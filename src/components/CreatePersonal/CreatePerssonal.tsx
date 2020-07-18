import React, {useEffect, useState} from 'react'
import {Title} from "../admin/AdminComponents";
import {
    DownloadPictureWrapper,
    GreenBtn,
    GreenDiv,
    Input,
    InputNone
} from "../mainStyledComponents/MainStyledComponents";
import css from './createPersonal.module.css'
import {useDispatch} from "react-redux";
import {setHeader} from "../../state/appReducer";
import pic from "../../img/pic.png";
import {useFormik} from "formik";
import api from '../../api/Api'
import {Link} from "react-router-dom";




const validate = (values:any) => {
    const errors:any = {};

    if (!values.surname) {
        errors.surname = 'Обязательно';
    }
    if (!values.name) {
        errors.name = 'Обязательно';
    }
    if(!values.password1){
        errors.password1 = 'Обязательно';
    }else if(values.password1.length < 8){
        errors.password1 = 'Минимум 8 символов';
    }
    if(!values.password2){
        errors.password2 = 'Обязательно';
    }else if(values.password2 !== values.password1) {
        errors.password2 = 'Не совподают';
    }
    if(!values.login){
        errors.login = 'Обязательно';
    }
    // if(!values.pa){
    //     errors.password1 = 'Обязательно';
    // }


    // else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //     errors.email = 'Invalid email address';
    // }
    return errors;
};

const CreatePersonal = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setHeader("Создание врача"))
    }, [dispatch])
    const [img, setImg] = useState('')
    const formik = useFormik({
        initialValues: {
            surname: '',
            name: '',
            middleName: '',
            aboutDoctor: '',
            degree: '',
            regalia: '',
            login: '',
            password1: '',
            password2: '',
            email: '',
        },
        validate,
        onSubmit: (values) => {
            // alert(JSON.stringify({...values, image: img}, null, 2));
            console.log({
                bio: values.aboutDoctor,
                birthDate: null,
                categories: null,
                firstName: values.name,
                image: img,
                lastName: values.surname,
                password: values.password1,
                patronymic: null,
                position: null,
                schedules: null,
                username: values.login
            })
            api.setDoctor({
                bio: values.aboutDoctor,
                birthDate: null,
                categories: null,
                firstName: values.name,
                image: img,
                lastName: values.surname,
                password: values.password1,
                patronymic: null,
                position: null,
                schedules: null,
                username: values.login

            })
                .then((res:any)=>{
                    console.log(res)
                })
        },
    });
    return (
        <div>
            <Title>
                Данные врача
            </Title>
            <form onSubmit={formik.handleSubmit} className={css.formWrapper}>
                <div className={css.form}>
                    <label className={css.label}>
                        <span>
                            <span>*</span>
                            Фамилия
                            <span className={css.error}>
                                {formik.errors.surname ? <div>{formik.errors.surname}</div> : null}
                            </span>
                        </span>
                        <Input
                            onChange={formik.handleChange}
                            name={"surname"}
                            value={formik.values.surname}
                            type={'text'}/>
                    </label>
                    <label className={css.label}>
                        <span><span>*</span>Имя
                        <span className={css.error}>
                                {formik.errors.name ? <div>{formik.errors.name}</div> : null}
                            </span>
                        </span>
                        <Input
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            name={"name"}
                            type={'text'}/>
                    </label>
                    <label className={css.label}>
                        <span><span>*</span>Отчество</span>
                        <Input
                            onChange={formik.handleChange}
                            name={"middleName"}
                            value={formik.values.middleName}
                            type={'text'}/>
                    </label>
                    <label className={css.label}>
                        <span><span>*</span>О враче</span>
                        <Input
                            onChange={formik.handleChange}
                            value={formik.values.aboutDoctor}
                            name={"aboutDoctor"}
                            type={'text'}/>
                    </label>
                    <label className={css.label}>
                        <span><span>*</span>Логин
                        <span className={css.error}>
                                {formik.errors.login ? <div>{formik.errors.login}</div> : null}
                            </span>
                        </span>
                        <Input
                            onChange={formik.handleChange}
                            value={formik.values.login}
                            name={"login"}
                            pattern={'banana|cherry'}
                            type={'text'}/>
                    </label>
                    {/*<label className={css.label}>*/}
                    {/*    <span><span>*</span>Опыт работы</span>*/}
                    {/*    <Input*/}
                    {/*        onChange={formik.handleChange}*/}
                    {/*        value={formik.values.degree}*/}
                    {/*        name={"degree"}*/}
                    {/*        type={'text'}/>*/}
                    {/*</label>*/}
                    <label className={css.label}>
                        <span><span>*</span>Регалии</span>
                        <Input
                            onChange={formik.handleChange}
                            value={formik.values.regalia}
                            name={"regalia"}
                            type={'text'}/>
                    </label>
                    <label className={css.label}>
                        <span><span>*</span>Пароль
                        <span className={css.error}>
                                {formik.errors.password1 ? <div>{formik.errors.password1}</div> : null}
                            </span>
                        </span>
                        <Input
                            onChange={formik.handleChange}
                            value={formik.values.password1}
                            name={"password1"}
                            type={'password'}/>
                    </label>
                    <label className={css.label}>
                        <span><span>*</span>Подтвердите пароль
                        <span className={css.error}>
                                {formik.errors.password2 ? <div>{formik.errors.password2}</div> : null}
                            </span>
                        </span>
                        <Input
                            onChange={formik.handleChange}
                            value={formik.values.password2}
                            name={"password2"}
                            type={'password'}/>
                    </label>
                    {/*<label className={css.label}>*/}
                    {/*    <span><span>*</span>Электронная почта</span>*/}
                    {/*    <Input*/}
                    {/*        onChange={formik.handleChange}*/}
                    {/*        value={formik.values.email}*/}
                    {/*        name={"email"}*/}
                    {/*        type={'email'}/>*/}
                    {/*</label>*/}
                    <div className={css.btnWrapper}>
                        <GreenBtn type={'submit'}>Зарегестрировать</GreenBtn>
                    </div>
                </div>
                <div className={css.imgWrapper}>
                    <div>
                    <label className={css.upload}>
                        <InputNone onChange={(e:any)=> {
                            const reader = new FileReader();
                            reader.readAsDataURL(e.target.files[0]);
                            reader.onload = (e: any) => {
                                const newUrl = e.target.result.split(',')
                                setImg(newUrl[1])
                            }
                        }} type={'file'} />
                        <DownloadPictureWrapper>
                            <img src={img ? "data:image/jpg;base64," + img : pic} alt="pic"/>
                        </DownloadPictureWrapper>
                        <GreenDiv>Загрузить фото</GreenDiv>
                    </label>
                    </div>
                    <div className={css.blue}>
                        <Link to={'add/time'}>
                            <GreenDiv>Создать расписание</GreenDiv>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreatePersonal