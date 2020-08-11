import React, {useEffect, useState} from 'react'
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
    const [times, setTimes] = useState([<Time/>])
    return (
        <>
            <Title>Расписание</Title>
            <Date />
            <div className={css.timeList}>
                {
                    times.map((item:any, index:number)=> <Time key={index} />)
                }
            </div>
            <Title className={css.addTime} onClick={()=>setTimes([...times, <Time/>])}>
                Добавить интервал работы
                <span className={css.plus}>+</span>
            </Title>
            <GreenBtn>Сохранить</GreenBtn>
        </>
    )
}
export default CreateTimeTable