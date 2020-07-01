import React, {useEffect} from 'react'
import {useDispatch} from "react-redux";
import {setHeader} from "../../state/appReducer";
import {Title} from "../admin/AdminComponents";
import Time, {Date} from "./Time";
import css from './create-time.module.css'
import {GreenBtn} from "../mainStyledComponents/MainStyledComponents";

const CreateTimeTable = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setHeader("Создание расписания"))
    }, [dispatch])
    return (
        <>
            <Title>Расписание</Title>
            <Date />
            <div className={css.timeList}>
                <Time/>
            </div>
            <Title className={css.addTime}>
                Добавить интервал работы
                <span className={css.plus}>+</span>
            </Title>
            <GreenBtn>Сохранить</GreenBtn>
        </>
    )
}
export default CreateTimeTable