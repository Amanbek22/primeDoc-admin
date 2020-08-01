import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import {setHeader} from "../../state/appReducer";
import {useFormik} from "formik";
import api from "../../api/Api";
import {Title} from "../admin/AdminComponents";
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
import {useRouteMatch, useHistory} from 'react-router-dom'

const Payment = () => {
    const {url} = useRouteMatch()
    const history = useHistory()

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setHeader("Способы оплаты"))
    }, [dispatch])
    const [img, setImg] = useState('')

    const formik = useFormik({
        initialValues: {
            ste0: '',
            paymentSteps: {
                step1: '',
                step2: '',
                step3: '',
                step4: '',
                step5: '',
            },
            last: '',
        },
        onSubmit: (values) => {
            let arr:any = []
            let i = 0;
            for(let key in values.paymentSteps) {
                const {paymentSteps} = values;
                i++
                let a = {
                    number: i,
                    // @ts-ignore
                    text: paymentSteps[key]
                }
                arr.push(a)
            }
            const data = {
                logo: img,
                name: values.ste0,
                nextSteps: values.last,
                paymentSteps: arr
            }
            api.createPayment(data)
                .then((res)=>{
                    history.push(url)
                })
            console.log(data)
        },
    });
    return (
        <div>
            <Title>
                Данные врача
            </Title>
            <form onSubmit={formik.handleSubmit} className={cs.wrapper}>
                <div className={css.form}>
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
                    <div className={cs.blue}>
                        {/*<Link to={'add/time'}>*/}
                            <GreenDiv className={cs.blueBtn}>Добавить способ оплаты</GreenDiv>
                        {/*</Link>*/}
                        <div className={css.btnWrapper}>
                            <GreenBtn type={'submit'}>Сохранить</GreenBtn>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Payment