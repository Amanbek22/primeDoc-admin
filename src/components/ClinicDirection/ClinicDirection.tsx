import React, {useEffect, useState} from 'react'
import {useDispatch} from "react-redux";
import {setHeader} from "../../state/appReducer";
import {GreenBtn} from "../mainStyledComponents/MainStyledComponents";
import css from './clinicdirection.module.css'
import edit from '../../img/edit.png'
import del from '../../img/delete.png'
import addPicture from '../../img/add-pic.png'
import Preloader from "../preloader/Preloader";

const ClinicDirection = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setHeader("Терапевты"))
    }, [dispatch])

    const [pending, setPending] = useState(true)

    setTimeout(() => {
        setPending(false)
    }, 500)

    if (pending) {
        return (
            <Preloader/>
        )
    }
    return (
        <div>
            <div className={css.headerWrapper}>
                <div className={css.picWrapper}>
                    <img
                        width={'100%'}
                        src="https://image.freepik.com/free-photo/front-view-doctor-with-medical-mask-posing-with-crossed-arms_23-2148445082.jpg"
                        alt="#"
                    />
                    <GreenBtn>
                        Добавить фото
                    </GreenBtn>
                </div>
                <div className={css.descriptionWrapper}>
                    <DescriptionElement title={'Название'} text={'Терапевт'}/>
                    <DescriptionElement title={'Описание'} text={'Специалист общего профиля'}/>
                    <DescriptionElement title={'Что лечит'} text={'К терапевту можно обратиться с любой медицинской\n' +
                    'проблемой-если он не разберется сам ,то направит \n' +
                    'к узкому специалисту.'}/>
                </div>
            </div>
            <div className={css.doctorsList}>
                <Doctors name={'Asylbekov Amanbek'} url={''}/>
                <Doctors name={'Asylbekov Amanbek'} url={'dsfdsf'}/>
                <Doctors name={'Asylbekov Amanbek'} url={''}/>
            </div>
            <div className={css.addDoc}>
                <GreenBtn>
                    Добавить врача
                </GreenBtn>
            </div>
        </div>
    )
}

type descriptionType = {
    title: string,
    text: string,
}
const DescriptionElement = (props: descriptionType) => {
    return (
        <div>
            <div className={css.title}>{props.title}</div>
            <div className={css.description}>
                <p>
                    {props.text}
                </p>
                <span>
                    <img src={edit} alt="edit"/>
                    <img src={del} alt="delete"/>
                </span>
            </div>
        </div>
    )
}

type DocType = {
    name: string
    url?: string
}
const Doctors = (props: DocType) => {
    return (
        <div className={css.doctorWrapper}>
            <div className={css.ava}>
                <div className={css.logoWrapper}>
                    {
                        props.url 
                            ? <img height={'auto'} width={'100%'}  src="https://image.freepik.com/free-vector/doctor-clinic-illustration_1270-69.jpg" alt="doc"/>
                            : <img height={'auto'} width={'100%'} src="https://jardin.ee/wp-content/uploads/2014/08/No-profile-LinkedIn.jpg" alt="#"/>
                    }
                    <img src={addPicture} alt="+" className={css.addPicture} onClick={()=> alert('Add Picture')}/>
                </div>
                <div className={css.name}>{props.name}</div>
            </div>
            <div>
                <span className={css.edit}>
                    <img src={edit} alt="edit"/>
                    <img src={del} alt="delete"/>
                </span>
            </div>
        </div>
    )
}

export default ClinicDirection