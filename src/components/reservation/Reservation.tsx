import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setHeader} from "../../state/appReducer";
import {
    Center,
    Last,
    ReservationHeader,
    ReservationList,
    TableWrapper
} from "../mainStyledComponents/MainStyledComponents";
import done from '../../img/done.png'
import reject from '../../img/reject.png'
import {getReservation, setPageAC, setPending} from "./reservationReducer";
import {GlobalStateType} from "../../state/root-reducer";
import {checkToken} from "../../state/authReducer";
import api from '../../api/Api'
import Pagination from "../paggination/Paggination";
import Preloader from "../preloader/Preloader";

const Reservation = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setHeader("Бронь"))
    }, [dispatch])
    const reservations = useSelector((state: GlobalStateType) => state.reservation)

    const setPage = (page: number) => {
        dispatch(setPageAC(page))
    }
    useEffect(() => {
        dispatch(getReservation(reservations.page))
    }, [pending])
    if(reservations.pending) return <Preloader />
    return (
        <>
            {
                reservations.data.length ? <> <TableWrapper>
                        <ReservationHeader>
                            <div>
                                ФИО
                            </div>
                            <div>
                                Номер телефона
                            </div>
                            <div>
                                Дата брони
                            </div>
                            <div>
                                C
                            </div>
                            <div>
                                По
                            </div>
                            <Last>
                                Действия
                            </Last>
                        </ReservationHeader>
                        {
                            reservations?.data.map((item: any) => {
                                return <List
                                    key={item.id}
                                    fio={item?.firstname + ' ' + item?.lastname + ' ' + item?.patronymic}
                                    number={item.phone}
                                    date={item.date}
                                    from={item.start}
                                    to={item.end}
                                    id={item.id}
                                />
                            })
                        }
                    </TableWrapper>
                        <br/>
                        {
                            reservations.data.length
                                ? <Pagination setPage={setPage} pageCount={reservations.pagination}/>
                                : null
                        }
                    </>
                    : <Center>Нет брони.</Center>
            }
        </>
    )
}

type ListProps = {
    fio: string
    number: number | string
    // category: string
    date: string
    from: string
    to: string
    id: number
}
const List: React.FC<ListProps> = (props) => {
    const dispatch = useDispatch()
    let date = new Date(props?.date)
    const requestCheck = async (req: any) => {
        return dispatch(checkToken(req))
    }
    const approve = () => {
        requestCheck(() => api.approve(props.id))
            .then((res) => {
                console.log(res)
                dispatch(setPending(true))
            })
    }
    const deleteReservation = () => {
        requestCheck(() => api.delReservation(props.id))
            .then((res) => {
                console.log(res)
                dispatch(setPending(true))
            })
    }
    return (
        <div>
            <ReservationList>
                <div title={props.fio}>{props.fio}</div>
                <div>{props.number}</div>
                <div>{date.toLocaleDateString()}</div>
                <div>{props.from}</div>
                <div>{props.to}</div>
                <Center>
                    <img onClick={approve} src={done} alt="одобрить"/>
                </Center>
                <Last>
                    <img onClick={deleteReservation} src={reject} alt="откланить"/>
                </Last>
            </ReservationList>
        </div>
    )
}

export default Reservation