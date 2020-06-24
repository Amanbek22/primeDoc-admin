import React, {useState} from "react";
import {AdminPageWrapper, CardsWrapper, FormModalWrapper, Title} from "./AdminComponents";
import {AdminHeader, Close, Line} from "../mainStyledComponents/MainStyledComponents";
import css from './admin.module.css'
import edit from '../../img/edit.png'
import del from '../../img/delete.png'
import Modal from "react-awesome-modal";


const AdminPage = () => {
    const [visible, setVisible] = useState(false)
    const list = [1, 7, 2, 3, 6, 15, 74, 4]
    const els = list.map((item) => <Card key={item}/>)
    const onModal = () => setVisible(!visible)
    return (
        <AdminPageWrapper>
            <AdminHeader>Клиника</AdminHeader>
            <Line/>
            <Title>Направления</Title>
            <CardsWrapper>
                {els}
                <AddCard open={onModal}/>
                <Modal visible={visible} width={"450"} height={"600"} onClickAway={onModal}>
                    <AddUserModal onModal={onModal}/>
                </Modal>
            </CardsWrapper>
        </AdminPageWrapper>
    )
}

const Card = (props) => {
    return (
        <div className={css.cardWrapper}>
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
        </div>
    )
}

const AddCard = (props) => {
    return (
        <div onClick={props.open} className={css.addCard}>
            {/*<img src=" " alt=""/>*/}
            <span>
                +
            </span>
        </div>
    )
}


const AddUserModal = (props) => {
    return (
        <FormModalWrapper>
            <Close onClick={props.onModal}>x</Close>
            <Title>
                Добавить направление
            </Title>
            <form>
                <div>

                </div>
                <div></div>
                <div></div>
            </form>
        </FormModalWrapper>
    )
}

export default AdminPage
