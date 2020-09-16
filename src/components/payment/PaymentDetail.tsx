import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import api from '../../api/Api'
import cs from "./payment.module.css";
import css from "../CreatePersonal/createPersonal.module.css";
import {
    DownloadPictureWrapper,
    GreenBtn,
    GreenDiv,
    Input,
    InputNone
} from "../mainStyledComponents/MainStyledComponents";
import pic from "../../img/pic.png";
import {Field, FieldArray, Form, Formik} from "formik";
import Preloader from "../preloader/Preloader";
import {checkToken} from "../../state/authReducer";
import {useDispatch} from "react-redux";
import deepEqual from "lodash.isequal";

const PaymentDetail = () => {
    const dispatch = useDispatch()
    const requestCheck =  async (req:any) => {
        return dispatch(checkToken(req))
    }
    const params: any = useParams()
    const [pending, setPending] = useState(true)
    const [data, setData] = useState()
    const [img, setImg] = useState('')
    const [visible, setVisible] = useState(false)
    const [edit, setEdit] = useState(false)
    const [image, setImage] = useState('')

    const onModal = () => setVisible(!visible)

    useEffect(() => {
        requestCheck(()=>api.getPayments(params.id))
            .then((res:any) => {
                setPending(false)
                setData(res.data)
                setImg(res.data.logo)
            })
    }, [params.id, pending])
    let initialValues = {
        step0: data?.name,
        steps: data?.paymentSteps.map((item:any) => ({step:item.text})),
        last: data?.nextSteps,
    }
    const step = {
        step: ''
    }
    const submit = (values:any) => {
        let newArr = values.steps.map((i:any, index: number) => ({
            text: i.step,
            number: index
        }))
        const data = {
            name: values.step0,
            nextSteps: values.last,
            paymentSteps: newArr
        }
        const formData = new FormData()
        formData.append('imageFile', image)
        requestCheck(()=>api.putPaymentImage(params.id, formData))
            .then((res)=>{
                console.log(res)
            })
        requestCheck(()=>api.putPaymentSteps(params.id, data))
            .then((res)=>{
                // history.push('/payment')
                setEdit(false)
                setPending(true)
            })
    }

    if (pending) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={cs.wrapper}>
                {
                    edit
                        ? <Formik initialValues={initialValues} onSubmit={submit}>
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
                                    return <Form className={css.wrapper}>
                                        <div className={css.form}>
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
                                                                values.steps.map((step:any, index:any) =>(
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
                                                                >Добавить опыт работы</button>
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
                                            <GreenBtn type={'submit'}>Сохранить</GreenBtn>
                                        </div>

                                    </Form>
                                }
                            }
                        </Formik>
                        : <div className={css.form}>
                            <label className={css.upload}>
                                <DownloadPictureWrapper>
                                    <img src={img ? img : pic} alt="#"/>
                                </DownloadPictureWrapper>
                            </label>
                            <label className={css.label}>
                                <span>Способ оплаты</span>
                                <span className={css.paymentText}>{data?.name}</span>
                            </label>
                            {
                                data?.paymentSteps.map((item: any, index: number) => <Steps key={item.id} id={item.id}
                                                                                            name={item.text}
                                                                                            step={index + 1}/>)
                            }
                            <label className={css.label}>
                                <span>Дальнейшие действия</span>
                                <span className={css.paymentText}>{data?.nextSteps}</span>
                            </label>
                        </div>
                }
                <div className={css.imgWrapper}>
                    <div className={cs.blue}>
                        <div className={css.btnWrapper}>
                            {
                                edit ? null :
                                    <GreenBtn onClick={() => setEdit(true)}>Изменить</GreenBtn>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

type StepProps = {
    id: number
    step: number
    name: string
}
const Steps = (props: StepProps) => {
    return (
        <label className={css.label}>
            <span>{props.step} шаг</span>
            <span className={css.paymentText}>{props.name}</span>
        </label>
    )
}

export default PaymentDetail