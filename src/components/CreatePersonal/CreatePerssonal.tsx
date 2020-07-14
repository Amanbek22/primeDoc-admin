import React, {useEffect} from 'react'
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

const CreatePersonal = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setHeader("Создание врача"))
    }, [dispatch])
    const submit = () => {

    }
    return (
        <div>
            <Title>
                Данные врача
            </Title>
            <form onSubmit={submit} className={css.formWrapper}>
                <div className={css.form}>
                    <label className={css.label}>
                        <span><span>*</span>Фамилия</span>
                        <Input type={'text'}/>
                    </label>
                    <label className={css.label}>
                        <span><span>*</span>Имя</span>
                        <Input type={'text'}/>
                    </label>
                    <label className={css.label}>
                        <span><span>*</span>Отчество</span>
                        <Input type={'text'}/>
                    </label>
                    <label className={css.label}>
                        <span><span>*</span>О враче</span>
                        <Input type={'text'}/>
                    </label>
                    <label className={css.label}>
                        <span><span>*</span>Логин</span>
                        <Input type={'text'}/>
                    </label>
                    <label className={css.label}>
                        <span><span>*</span>Пароль</span>
                        <Input type={'text'}/>
                    </label>
                    <label className={css.label}>
                        <span><span>*</span>Подтвердите пароль</span>
                        <Input type={'text'}/>
                    </label>
                    <label className={css.label}>
                        <span><span>*</span>Электронная почта</span>
                        <Input type={'text'}/>
                    </label>
                    <div className={css.btnWrapper}>
                        <GreenBtn type={'submit'}>Зарегестрировать</GreenBtn>
                    </div>
                </div>
                <div className={css.imgWrapper}>
                    <div>
                    <label className={css.upload}>
                        <InputNone type={'file'} />
                        <DownloadPictureWrapper>
                            <img src={pic} alt="pic"/>
                        </DownloadPictureWrapper>
                        <GreenDiv>Загрузить фото</GreenDiv>
                    </label>
                    </div>
                    <div className={css.blue}>
                        <GreenBtn>Создать расписание</GreenBtn>
                    </div>
                </div>
            </form>
        </div>
    )
}


export default CreatePersonal