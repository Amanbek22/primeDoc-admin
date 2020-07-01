import React, {useEffect, useState} from "react";
import {AdminPageWrapper, CardsWrapper, FormModalWrapper, Title} from "./AdminComponents";
import { GreenBtn, Input} from "../mainStyledComponents/MainStyledComponents";
import css from './admin.module.css'
import edit from '../../img/edit.png'
import del from '../../img/delete.png'
import pic from '../../img/pic.png'
import ModalWrapper from "../modal/Modal";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setHeader} from "../../state/appReducer";


const AdminPage = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(setHeader("Клиника"))
    }, [dispatch])
    const [visible, setVisible] = useState(false)
    const list = [1, 7, 2, 3, 6, 15, 74, 4]
    const els = list.map((item) => <Card key={item}/>)
    const onModal = () => setVisible(!visible)
    return (
        <AdminPageWrapper>
            <Title>Направления</Title>
            <CardsWrapper>
                {els}
                <AddCard open={onModal}/>
                <ModalWrapper onModal={onModal} visible={visible} width={"450"} height={"420"} onClickAway={onModal}>
                    <AddUserModal onModal={onModal}/>
                </ModalWrapper>
            </CardsWrapper>
        </AdminPageWrapper>
    )
}

const Card = (props:any) => {
    return (
        <Link to={'/clinic/5'} className={css.cardWrapper}>
            <div className={css.link}>
                <img
                    src="https://image.freepik.com/free-photo/front-view-doctor-with-medical-mask-posing-with-crossed-arms_23-2148445082.jpg"
                    alt="#"
                />
                <span className={css.title}>
                    Терапевт
                </span>
                <div className={css.blue}/>
            </div>
            <div className={css.buttonsWrapper}>
                <span className={css.edit}>
                    <img src={edit} alt="edit"/>
                    Редактировать
                </span>
                <span className={css.delete}>
                    <img src={del} alt="delete"/>
                    Удалить
                </span>
            </div>
        </Link>
    )
}

const AddCard = (props: any) => {
    return (
        <div onClick={props.open} className={css.addCard}>
            <span>
                +
            </span>
        </div>
    )
}


const AddUserModal = (props: any) => {
    const submit = (e:any) =>{
        e.preventDefault()
    }
    return (
        <FormModalWrapper>
            <Title className={css.modalTitle}>
                Добавить направление
            </Title>
            <form onSubmit={submit}>
                <div className={css.downloadWrapper}>
                    <div className={css.downloadPicture}>
                        <img src={pic} alt="pic"/>
                    </div>
                    <GreenBtn>Загрузить фото</GreenBtn>
                </div>
                <div className={css.name}>
                    <label>
                        Название
                        <Input type="text" />
                    </label>
                </div>
                <div className={css.save}>
                    <GreenBtn>Сохранить</GreenBtn>
                </div>
            </form>
        </FormModalWrapper>
    )
}

export default AdminPage
