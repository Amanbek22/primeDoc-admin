import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import {setHeader} from "../../state/appReducer";
import {useFormik} from "formik";
// import api from "../../api/Api";
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
import {Link} from "react-router-dom";


const Payment = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setHeader("Создание врача"))
    }, [dispatch])
    const [img, setImg] = useState('')
    const formik = useFormik({
        initialValues: {
            ste0: '',
            step1: '',
            step2: '',
            step3: '',
            step4: '',
            step5: '',
            step6: '',
        },
        onSubmit: (values) => {
            alert(JSON.stringify({...values, image: img}, null, 2));

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
                            value={formik.values.step1}
                            name={"step1"}
                            type={'text'}/>
                    </label>
                    <label className={css.label}>
                        <span>2 шаг</span>
                        <Input
                            onChange={formik.handleChange}
                            name={"step2"}
                            value={formik.values.step2}
                            type={'text'}/>
                    </label>
                    <label className={css.label}>
                        <span>3 шаг</span>
                        <Input
                            onChange={formik.handleChange}
                            value={formik.values.step3}
                            name={"step3"}
                            type={'text'}/>
                    </label>
                    <label className={css.label}>
                        <span>4 шаг</span>
                        <Input
                            onChange={formik.handleChange}
                            value={formik.values.step4}
                            name={"step4"}
                            type={'text'}/>
                    </label>
                    <label className={css.label}>
                        <span>5 шаг</span>
                        <Input
                            onChange={formik.handleChange}
                            value={formik.values.step5}
                            name={"step5"}
                            type={'text'}/>
                    </label>
                    <label className={css.label}>
                        <span>Дальнейшие действия</span>
                        <Input
                            onChange={formik.handleChange}
                            value={formik.values.step6}
                            name={"step6"}
                            type={'text'}/>
                    </label>
                </div>
                <div className={css.imgWrapper}>
                    <div>
                        <label className={css.upload}>
                            <InputNone onChange={(e:any)=> {
                                const reader = new FileReader();
                                reader.readAsDataURL(e.target.files[0]);
                                reader.onload = (e: any) => setImg(e.target.result)
                            }} type={'file'} />
                            <DownloadPictureWrapper>
                                <img src={pic} alt="pic"/>
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