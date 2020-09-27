import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import {setHeader} from "../../state/appReducer";
import {FieldArray, Formik, Form, Field} from "formik";
import api from "../../api/Api";
import cs from './payment.module.css'
import css from "../CreatePersonal/createPersonal.module.css";
import {
    DownloadPictureWrapper,
    GreenBtn,
    GreenDiv,
    Input,
    InputNone
} from "../mainStyledComponents/MainStyledComponents";
import pic from "../../img/pic.png";
import {useHistory} from 'react-router-dom'
import {checkToken} from "../../state/authReducer";
import deepEqual from "lodash.isequal";

const Payment = () => {
    const history = useHistory()

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setHeader("Способы оплаты"))
    }, [dispatch])
    const requestCheck =  async (req:any) => {
        return dispatch(checkToken(req))
    }
    const [img, setImg] = useState('')
    const [image, setImage] = useState('')
    const initialValues = {
        step0: '',
        steps: [
            {step: ''},
            {step: ''},
            {step: ''},
        ],
        last: '',
    }
    const step = {
        step: ''
    }
    const submit = (values:any) => {
        let newArr = values.steps.map((i:any, index: number) => ({
            text: i.step,
            number: index
        }))
        const formData = new FormData()
        formData.append('imageFile', image)
        formData.append('name', values.step0)
        formData.append('nextSteps', values.last)
        for(let key in newArr){
            formData.append(`paymentSteps[${key}].text`, newArr[key].text)
            formData.append(`paymentSteps[${key}].number`, newArr[key].number)
        }
        requestCheck(()=>api.createPayment(formData))
            .then((res)=>{
                history.push('/payment')
            })
    }
    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={submit}>
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
                        return <Form className={cs.wrapper}>
                            <div className={css.form}>
                                <label className={css.label}>
                                    <span>Способ оплаты</span>
                                    <Field as={Input} name={'step0'} />
                                </label>
                                <FieldArray
                                    name={'steps'}
                                    render={(arrayHelpers)=>{
                                        return (
                                            <div className={cs.steps}>
                                                {values.steps && values.steps.length > 0 ? (
                                                values.steps.map((step, index) =>(
                                                    <label key={index} className={css.label}>
                                                        <span>{index + 1} шаг</span>
                                                        <Field as={Input} name={`steps.${index}.step`} />
                                                    </label>
                                                ))) : (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            arrayHelpers.push(step)
                                                        }
                                                    >
                                                        {/* show this when user has removed all friends from the list */}
                                                        Добавить опыт работы
                                                    </button>
                                                )}
                                                <button
                                                    className={css.add}
                                                    type="button"
                                                    onClick={() =>
                                                        arrayHelpers.push(step)
                                                    }
                                                >
                                                    +Добавить
                                                </button>
                                            </div>
                                        )
                                    }}
                                />

                                <label className={css.label}>
                                    <span>Дальнейшие действия</span>
                                    <Field as={Input} name={'last'} />
                                </label>
                            </div>
                            <div className={css.imgWrapper}>
                                <div>
                                    <label className={css.upload}>
                                        <InputNone onChange={(e: any) => {
                                            const reader = new FileReader();
                                            reader.readAsDataURL(e.target.files[0]);
                                            reader.onload = (e: any) => {
                                                const newUrl = e.target.result.split(',')
                                                setImg(newUrl[1])
                                            }
                                            setImage(e.target.files[0])
                                        }} type={'file'}/>
                                        <DownloadPictureWrapper>
                                            <img src={img ? "data:image/jpg;base64," + img : pic} alt="pic"/>
                                        </DownloadPictureWrapper>
                                        <GreenDiv>Загрузить фото</GreenDiv>
                                    </label>
                                </div>
                                <div className={cs.blue}>
                                    {/*<Link to={'add/time'}>*/}
                                    {/*    <GreenDiv className={cs.blueBtn}>Добавить способ оплаты</GreenDiv>*/}
                                    {/*</Link>*/}
                                    <div className={css.btnWrapper}>
                                        <GreenBtn type={'submit'}>Сохранить</GreenBtn>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    }
                }
            </Formik>
        </div>
    )
}

export default Payment