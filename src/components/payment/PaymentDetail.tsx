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
import {useFormik} from "formik";
import Preloader from "../preloader/Preloader";
import {checkToken} from "../../state/authReducer";
import {useDispatch} from "react-redux";

const PaymentDetail = () => {
    const dispatch = useDispatch()
    const requestCheck =  async (req:any) => {
        return dispatch(checkToken(req))
    }
    const params: any = useParams()
    const [pending, setPending] = useState(true)
    const [data, setData] = useState()
    const [img, setImg] = useState(null)
    const [visible, setVisible] = useState(false)
    const [edit, setEdit] = useState(false)

    const onModal = () => setVisible(!visible)

    useEffect(() => {
        requestCheck(()=>api.getPayments(params.id))
            .then((res:any) => {
                setPending(false)
                console.log(res.data)
                setData(res.data)
                setImg(res.data.logo)
            })
    }, [params.id, pending])

    const formik = useFormik({
        initialValues: {
            ste0: data?.name,
            paymentSteps: {
                step1: data?.paymentSteps[0]?.text,
                step2: data?.paymentSteps[1]?.text,
                step3: data?.paymentSteps[2]?.text,
                step4: data?.paymentSteps[3]?.text,
                step5: data?.paymentSteps[4]?.text,
            },
            last: data?.nextSteps,
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            let arr: any = []
            let i = 0;
            for (let key in values.paymentSteps) {
                const {paymentSteps} = values;
                i++
                let a = {
                    number: i,
                    // @ts-ignore
                    text: paymentSteps[key]
                }
                arr.push(a)
            }
            const d = {
                logo: img,
                name: values.ste0,
                nextSteps: values.last,
                paymentSteps: arr
            }
            requestCheck(()=>api.putPaymentSteps(params.id, d))
                .then((res:any)=>{
                    // history.push('/payment')
                    setEdit(false)
                    setPending(true)
                    console.log(res)
                })
            console.log(d)
        },
    });

    if (pending) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={cs.wrapper}>
                {
                    edit
                        ? <form onSubmit={formik.handleSubmit} className={css.form}>
                            <label className={css.upload}>
                                <InputNone onChange={(e: any) => {
                                    const reader = new FileReader();
                                    reader.readAsDataURL(e.target.files[0]);
                                    reader.onload = (e: any) => {
                                        const newUrl = e.target.result.split(',')
                                        setImg(newUrl[1])
                                    }
                                }} type={'file'}/>
                                <DownloadPictureWrapper>
                                    <img src={img ? "data:image/jpg;base64," + img : pic} alt="pic"/>
                                </DownloadPictureWrapper>
                                <GreenDiv>Загрузить фото</GreenDiv>
                            </label>
                            <label className={css.label}>
                                <span>Способ оплаты</span>
                                <Input
                                    onChange={formik.handleChange}
                                    name={"ste0"}
                                    value={formik.values.ste0}
                                    type={'text'}/>
                            </label>
                            <label className={css.label}>
                                <span>1 шаг</span>
                                <Input
                                    onChange={formik.handleChange}
                                    value={formik.values.paymentSteps.step1}
                                    name={"paymentSteps.step1"}
                                    type={'text'}/>
                            </label>
                            <label className={css.label}>
                                <span>2 шаг</span>
                                <Input
                                    onChange={formik.handleChange}
                                    name={"paymentSteps.step2"}
                                    value={formik.values.paymentSteps.step2}
                                    type={'text'}/>
                            </label>
                            <label className={css.label}>
                                <span>3 шаг</span>
                                <Input
                                    onChange={formik.handleChange}
                                    value={formik.values.paymentSteps.step3}
                                    name={"paymentSteps.step3"}
                                    type={'text'}/>
                            </label>
                            <label className={css.label}>
                                <span>4 шаг</span>
                                <Input
                                    onChange={formik.handleChange}
                                    value={formik.values.paymentSteps.step4}
                                    name={"paymentSteps.step4"}
                                    type={'text'}/>
                            </label>
                            <label className={css.label}>
                                <span>5 шаг</span>
                                <Input
                                    onChange={formik.handleChange}
                                    value={formik.values.paymentSteps.step5}
                                    name={"paymentSteps.step5"}
                                    type={'text'}/>
                            </label>
                            <label className={css.label}>
                                <span>Дальнейшие действия</span>
                                <Input
                                    onChange={formik.handleChange}
                                    value={formik.values.last}
                                    name={"last"}
                                    type={'text'}/>
                            </label>
                            <GreenBtn>Сохранить</GreenBtn>
                        </form>
                        : <div className={css.form}>
                            <label className={css.upload}>
                                <DownloadPictureWrapper>
                                    <img src={img ? "data:image/jpg;base64," + img : pic} alt="#"/>
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