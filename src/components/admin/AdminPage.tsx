import React, {useEffect, useState} from "react";
import {AdminPageWrapper, CardsWrapper, FormModalWrapper, Title} from "./AdminComponents";
import {
    DownloadPictureWrapper,
    GreenBtn,
    GreenDiv,
    Input,
    InputNone
} from "../mainStyledComponents/MainStyledComponents";
import css from './admin.module.css'
import edit from '../../img/edit.png'
import del from '../../img/delete.png'
import pic from '../../img/pic.png'
import ModalWrapper from "../modal/Modal";
import {Link, useHistory} from "react-router-dom";
import {connect, useDispatch} from "react-redux";
import {setHeader} from "../../state/appReducer";
import {GlobalStateType} from "../../state/root-reducer";
import api from '../../api/Api'
import DeleteModal from "../utils/DeleteModal";

type AdminPageProps = {
    directions: any
}
const AdminPage: React.FC<AdminPageProps> = (props) => {
    const {directions} = props
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setHeader("Клиника"))
    }, [dispatch])
    const [visible, setVisible] = useState(false)
    const els = directions.map((item: any) => <Card id={item.id} image={item.image} title={item.name} key={item.id}/>)
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

type CardProps = {
    id: number
    title: string
    image: string
}

const Card: React.FC<CardProps> = (props) => {

    const [visible, setVisible] = useState(false)
    const onModal = () => setVisible(!visible)

    const deleteDirection = () => {
        api.delCategory(props.id)
            .then((res: any) => console.log(res))
    }
    return (
        <div className={css.cardWrapper}>
            <Link to={`/clinic/${props.id}`} className={css.link}>
                <img

                    src={props.image ? "data:image/jpg;base64," + props.image : "https://image.freepik.com/free-photo/front-view-doctor-with-medical-mask-posing-with-crossed-arms_23-2148445082.jpg"}
                    alt={props.title}
                />
                <span className={css.title}>
                    {props.title}
                </span>
                <div className={css.blue}/>
            </Link>
            <div className={css.buttonsWrapper}>
                <span className={css.edit}>
                    <img src={edit} alt="edit"/>
                    Редактировать
                </span>
                <span onClick={onModal} className={css.delete}>
                    <img src={del} alt="delete"/>
                    Удалить
                </span>
            </div>
            <ModalWrapper onModal={onModal} visible={visible} width={"450"} height={"400"} onClickAway={onModal}>
                <DeleteModal text={'Вы уверены что хотите удалить'} onModal={onModal} title={props.title} del={deleteDirection}/>
            </ModalWrapper>
        </div>
    )
}

const AddCard = (props: any) => {
    return (
        <div onClick={props.open} className={css.addCard}>
            <span>+</span>
        </div>
    )
}

const AddUserModal = (props: any) => {
    const history = useHistory()
    console.log(history)
    const [name, setName] = useState('')
    const [url, setUrl] = useState('')
    const submit = (e: any) => {
        e.preventDefault()
        const newUrl = url.split(',')
        props.onModal()

        const data = {
            description: '',
            doctors: [],
            illnesses: [],
            name: name,
            image: newUrl[1]
        }
        api.setCategory(data)
            .then((res: any) => {
                console.log(res)
                history.go(1)
            })
    }
    return (
        <FormModalWrapper>
            <Title className={css.modalTitle}>
                Добавить направление
            </Title>
            <form onSubmit={submit}>
                <div className={css.downloadWrapper}>
                    <DownloadPictureWrapper>
                        <img src={url === '' ? pic : url} alt="pic"/>
                    </DownloadPictureWrapper>
                    <label>
                        <InputNone type="file" onChange={(e: any) => {
                            const reader = new FileReader();
                            reader.readAsDataURL(e.target.files[0]);
                            reader.onload = (e: any) => setUrl(e.target.result)

                        }}/>
                        <GreenDiv>Загрузить фото</GreenDiv>
                    </label>
                </div>
                <div className={css.name}>
                    <label>
                        Название
                        <Input value={name} onChange={(e: any) => setName(e.target.value)} type="text"/>
                    </label>
                </div>
                <div className={css.save}>
                    <GreenBtn>Сохранить</GreenBtn>
                </div>
            </form>
        </FormModalWrapper>
    )
}

const mapStateToProps = (state: GlobalStateType) => {
    return {
        directions: state.app.directions
    }
}

export default connect(mapStateToProps, {})(AdminPage)
