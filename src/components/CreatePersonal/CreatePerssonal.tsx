import React from 'react'
import {Title} from "../admin/AdminComponents";
import {GreenBtn, Input} from "../mainStyledComponents/MainStyledComponents";
import css from './createPersonal.module.css'

const CreatePersonal = () => {
    return (
        <div>
            <Title>
                Данные врача
            </Title>
            <form className={css.formWrapper}>
                <label className={css.label}>
                    <span><span>*</span>ФИО</span>
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
                    <GreenBtn>Зарегестрировать</GreenBtn>
                </div>
            </form>
        </div>
    )
}


export default CreatePersonal