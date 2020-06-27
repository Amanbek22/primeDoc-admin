import React, {useEffect, useState} from 'react'
import css from './medCarts.module.css'
import ModalWrapper from "../modal/Modal";
import pic from '../../img/pic.png'
import {TableWrapper, TableHeader, Last, TableList} from "../mainStyledComponents/MainStyledComponents";
import {useDispatch} from "react-redux";
import {setHeader} from "../../state/appReducer";

const MedCarts = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(setHeader("Медицинская карта"))
    }, [dispatch])
    return (
        <TableWrapper>
            <TableHeader>
                <div>
                    ФИО
                </div>

                <div>
                    Дата рождения
                </div>
                <div>
                    WhatsApp номер
                </div>
                <Last>
                    Фотография
                </Last>
            </TableHeader>
            <List fio={'Asylbekov Asylbekov Amanbek Taalaibekovich'} date={'22.11.2000'} number={'0708626798'}/>
        </TableWrapper>
    )
}

type ListProps = {
    fio: string,
    date: string,
    number: string
}

const List: React.FC<ListProps> = (props) => {
    const [visible, setVisible] = useState(false)
    const onModal = () => setVisible(!visible)
    return (
        <div>
            <TableList>
                <div>
                    {props.fio}
                </div>

                <div>
                    {props.date}
                </div>
                <div>
                    {props.number}
                </div>
                <Last onClick={onModal} className={css.watchPicture}>
                    Посмотреть фото
                </Last>
            </TableList>
            <ModalWrapper onModal={onModal} width={'450'} height={'420'} visible={visible}>
                <div className={css.modalWrapper}>
                    <img src={pic} alt="#"/>
                </div>
            </ModalWrapper>
        </div>
    )
}


export default MedCarts
