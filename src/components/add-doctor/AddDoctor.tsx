import React, {useEffect} from 'react'
import css from './add-doctor.module.css'
import {DownloadPictureWrapper, GreenBtn, Input, TextArea} from "../mainStyledComponents/MainStyledComponents";
import pic from "../../img/pic.png";
import {useDispatch} from "react-redux";
import {setHeader} from "../../state/appReducer";
import {Link} from "react-router-dom";

const AddDoctor = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setHeader("Подробнее о враче"))
    }, [dispatch])
    return (
        <div className={css.wrapper}>
            <div>
                <label>
                    ФИО
                    <Input type="text"/>
                </label>
                <label>
                    О враче
                    <TextArea/>
                </label>
            </div>
            <div>
                <div className={css.downloadWrapper}>
                    <DownloadPictureWrapper>
                        <img src={pic} alt="pic"/>
                    </DownloadPictureWrapper>
                    <GreenBtn>Загрузить фото</GreenBtn>
                </div>

                <div className={css.btnWrapper}>
                    <GreenBtn>Сохранить информацию</GreenBtn>
                    <Link to={'add/time'}>
                        <GreenBtn className={css.blue}>Создать расписание</GreenBtn>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default AddDoctor