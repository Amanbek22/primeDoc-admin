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
import {Link} from "react-router-dom";
import {connect, useDispatch} from "react-redux";
import {setHeader} from "../../state/appReducer";
import {GlobalStateType} from "../../state/root-reducer";
import api from '../../api/Api'

type AdminPageProps = {
    directions: any
}
const AdminPage: React.FC<AdminPageProps> = (props) => {
    const {directions} = props
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(setHeader("Клиника"))
    }, [dispatch])
    const [visible, setVisible] = useState(false)
    const els = directions.map((item:any) => <Card image={item.image}  title={item.name} key={item.id}/>)
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
    title: string
    image: string
}

const Card: React.FC<CardProps> = (props) => {
    return (
        <div  className={css.cardWrapper}>
            <Link to={'/clinic/5'} className={css.link}>
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
                <span onClick={()=> alert('Hello world!!!')} className={css.delete}>
                    <img src={del} alt="delete"/>
                    Удалить
                </span>
            </div>
        </div>
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
    const [name, setName] = useState('')
    const [img, setImg] = useState<any>({})
    const [url, setUrl] = useState('')
    console.log(url )
    const submit = (e:any) =>{
        e.preventDefault()

        const data = new FormData()
        data.append('name', name)
        data.append('image', img)
        api.setCategory({
            name: name,
            image: url
        })
            .then((res:any)=>{
                console.log(res)
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
                        <img src={ url === '' ? pic : url} alt="pic"/>
                    </DownloadPictureWrapper>
                    <label>
                        <InputNone type="file"  onChange={(e:any)=>{
                            setImg(e.target.files[0])

                            const reader = new FileReader();

                            reader.readAsDataURL(e.target.files[0]);

                            reader.onload = (e:any) => setUrl(e.target.result)

                        }}/>
                        <GreenDiv>Загрузить фото</GreenDiv>
                    </label>
                </div>
                <div className={css.name}>
                    <label>
                        Название
                        <Input value={name} onChange={(e:any) => setName(e.target.value)} type="text" />
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
