import React, {useEffect, useState} from 'react'
import css from './medCarts.module.css'
import ModalWrapper from "../modal/Modal";
import pic from '../../img/pic.png'
import {TableWrapper, TableHeader, Last, TableList} from "../mainStyledComponents/MainStyledComponents";
import {useDispatch} from "react-redux";
import {setHeader} from "../../state/appReducer";
import Preloader from '../preloader/Preloader'
import api from '../../api/Api'
import Pagination from "../paggination/Paggination";

const MedCarts = () => {
    const [pending, setPending] = useState(true)
    const [user, setUser] = useState([])
    const [pagination, setPagination] = useState(0)
    const [page, setPage] = useState(1)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setHeader("Медицинская карта"))
    }, [dispatch])
    useEffect(() => {
        api.getUser().then((res: any) => {
            setUser(res.data)
            setPagination(Math.ceil(res.data.length / 5))
            setPending(false)
        }, (error: any) => console.error(error))
    }, [page])
    if (pending) {
        return <Preloader/>
    }
    return (
        <>
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
                {
                    user.map((item: any) => <List
                        key={item.id}
                        fio={`${item.firstName} ${item.lastName}`}
                        number={item.username}
                        date={item.birthDate}/>)
                }
            </TableWrapper>
            <Pagination setPage={setPage} pageCount={pagination}/>
        </>
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
    let date = new Date(props.date).toISOString().substring(0, 10).replace(/-/g, '.');
    return (
        <div>
            <TableList>
                <div>
                    {props.fio}
                </div>
                <div>
                    {date}
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
