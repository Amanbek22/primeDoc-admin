import React, {useEffect, useState} from 'react'
import {useDispatch} from "react-redux";
import {setHeader} from "../../state/appReducer";
import api from "../../api/Api";
import {CardsWrapper} from "../admin/AdminComponents";
import {CardWrapper} from "../mainStyledComponents/MainStyledComponents";
import css from "../admin/admin.module.css";
import {Link, useHistory} from "react-router-dom";
import edit from "../../img/edit.png";
import del from "../../img/delete.png";
import {AddCard} from "../admin/AdminPage";
import Preloader from "../preloader/Preloader";


const Payments = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setHeader("Способы оплаты"))
    }, [dispatch])
    const history = useHistory()

    //state
    const [pending, setPending] = useState(true)
    const [payments, setPayments] = useState([])

    useEffect(() => {
        api.getPayments()
            .then((res) => {
                console.log(res)
                setPayments(res.data)
                setPending(false)
            })
    }, [])


    if(pending){
        return <Preloader />
    }
    return (
        <CardsWrapper>
            {
                payments.map((item: any) => <Card title={item.name} id={item.id} setEdit={() => {
                }} image={item.logo}/>)
            }
            <AddCard open={()=>{
                history.push('/payment/add')
            }}/>
        </CardsWrapper>
    )
}

type CardProps = {
    id: number
    title: string
    image: string
    setEdit: () => void
}

const Card = (props: CardProps) => {
    return (
        <CardWrapper>
            <Link to={`/payment/detail/${props.id}`}>
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
                {/*<Link to={`/payment/detail/${props.id}`} onClick={props.setEdit} className={css.edit}>*/}
                {/*    <img src={edit} alt="edit"/>*/}
                {/*    Редактировать*/}
                {/*</Link>*/}
                <span />
                <span onClick={()=>{}} className={css.delete}>
                    <img src={del} alt="delete"/>
                    Удалить
                </span>
                <span />
            </div>
        </CardWrapper>
    )
}

export default Payments