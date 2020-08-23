import React, {useEffect, useState} from "react";
import {AdminPageWrapper, CardsWrapper, FormModalWrapper, Title} from "./AdminComponents";
import {
    CardWrapper,
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
import {Link} from "react-router-dom";
import {connect, useDispatch} from "react-redux";
import {addDirection, editDirection, removeDirection, setHeader} from "../../state/appReducer";
import {GlobalStateType} from "../../state/root-reducer";
import api from '../../api/Api'
import DeleteModal from "../utils/DeleteModal";
import Preloader from "../preloader/Preloader";
import {checkToken} from "../../state/authReducer";

type AdminPageProps = {
    directions: any,
    pending: boolean
}
const AdminPage: React.FC<AdminPageProps> = (props) => {
    const {directions} = props
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setHeader("Клиника"))
    }, [dispatch])
    const setEdit = () => dispatch(editDirection(true))
    const [visible, setVisible] = useState(false)
    const els = directions.map((item: any, index: number) => <Card index={index} setEdit={setEdit} id={item.id} image={item.image} title={item.name} key={item.id}/>)
    const onModal = () => setVisible(!visible)

    if(props.pending){
        return <Preloader/>
    }
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
    index: number
    id: number
    title: string
    image: string
    setEdit: () => void
}

const Card: React.FC<CardProps> = (props) => {
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)
    const onModal = () => setVisible(!visible)
    const requestCheck =  async (req:any) => {
        return dispatch(checkToken(req))
    }
    const deleteDirection = () => {
        requestCheck(()=>api.delCategory(props.id))
            .then((res: any) => {
                dispatch(removeDirection(props.index))
            })
    }
    return (
        <CardWrapper>
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
                <Link to={`/clinic/${props.id}`} onClick={props.setEdit} className={css.edit}>
                    <img src={edit} alt="edit"/>
                    Редактировать
                </Link>
                <span onClick={onModal} className={css.delete}>
                    <img src={del} alt="delete"/>
                    Удалить
                </span>
            </div>
            <ModalWrapper onModal={onModal} visible={visible} width={"450"} height={"400"} onClickAway={onModal}>
                <DeleteModal text={'Вы уверены что хотите удалить'} onModal={onModal} title={props.title} del={deleteDirection}/>
            </ModalWrapper>
        </CardWrapper>
    )
}

export const AddCard = (props: any) => {
    return (
        <div onClick={props.open} className={css.addCard}>
            <span>+</span>
        </div>
    )
}

const AddUserModal = (props: any) => {
    const dispatch = useDispatch()
    const requestCheck =  async (req:any) => {
        return dispatch(checkToken(req))
    }
    const [name, setName] = useState('')
    const [url, setUrl] = useState('')
    const [dis, setDis] = useState(true)
    useEffect(()=>{
        if(name && url){
            setDis(false)
        }else{
            setDis(true)
        }
    }, [name, url])
    const submit = (e: any) => {
        e.preventDefault()
        props.onModal()
        const data = {
            description: '',
            doctors: [],
            illnesses: [],
            name: name,
            image: url
        }
        requestCheck(()=>api.setCategory(data))
            .then((res: any) => {
                dispatch(addDirection(res.data))
                setUrl('')
                setName('')
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
                        <img src={url !== '' ? "data:image/jpg;base64," + url : pic} alt="pic"/>
                    </DownloadPictureWrapper>
                    <label>
                        <InputNone type="file" onChange={(e: any) => {
                            const reader = new FileReader()
                            if(e.target.files.length) {
                                reader.readAsDataURL(e.target.files[0]);
                                reader.onload = (e: any) => {
                                    const newUrl = e.target.result.split(',')
                                    setUrl(newUrl[1])
                                }
                            }else{
                                setUrl('')
                            }
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
                    <GreenBtn disabled={dis}>Сохранить</GreenBtn>
                </div>
            </form>
        </FormModalWrapper>
    )
}

const mapStateToProps = (state: GlobalStateType) => {
    return {
        directions: state.app.directions,
        pending: state.app.pending
    }
}

export default connect(mapStateToProps, {})(AdminPage)
