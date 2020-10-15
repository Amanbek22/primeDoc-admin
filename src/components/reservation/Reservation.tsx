import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setHeader} from "../../state/appReducer";
import {
    Center, GreenBtn,
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
import {firestore} from "firebase";
import {log} from "util";
import ModalWrapper from "../modal/Modal";
import css from './reservation.module.css'

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
    }, [reservations.pending])
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
                                    doctor={item.doctorId}
                                    doctorId={item.userDoctorId}
                                    clientId={item.userClientId}
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
    clientId: number
    doctorId: number
    doctor: number
}
const List: React.FC<ListProps> = (props) => {
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)
    const [approved, setApproved] = useState(false)
    const [error, setError] = useState(false)
    const [err, setErr] = useState('')

    const onModal = () => setVisible(!visible)
    const onApprove = () => setApproved(!approved)
    const onError = () => setError(!error)

    let date = new Date(props?.date)
    const requestCheck = async (req: any) => {
        return dispatch(checkToken(req))
    }
    const dataBase = firestore()
    const onChatCreate = () => {
        onApprove()
        dispatch(setPending(true))
    }
    const approve = () => {
        requestCheck(() => api.approve(props.id))
            .then(async (res) => {
                api.getDoc(props.doctor)
                    .then(async (response)=>{
                        let {username, firstName, lastName, patronymic} = response.data
                        let chat = await dataBase.collection("PrimeDocChat").doc(`${props.doctorId}${props.clientId}`).get()
                        if(chat.exists){
                            onApprove()
                        }else{
                            try {
                                await dataBase?.collection("PrimeDocChat").doc(`${props.doctorId}${props.clientId}`).set({
                                    adminId: props.doctorId.toString(),
                                    adminPhone: username,
                                    chatStarted: false,
                                    clientId: props.clientId.toString(),
                                    doctorName: firstName,
                                    doctorSurname: lastName,
                                    patronymic: patronymic,
                                    lastMessage: '',
                                    lastMessageSenderId: null,
                                    lastMessageTime: new Date(),
                                    userPhone: ''
                                });
                            } catch (error) {
                                alert('some error with creating chat between doctor and user!')
                                // console.log(error.message)
                            }
                            onApprove()
                        }
                        // dispatch(setPending(true))
                    })
            }, (error) => {
                onError()
                setErr(error.message)
                console.log(error)
            })
    }
    const deleteReservation = () => {
        requestCheck(() => api.delReservation(props.id))
            .then((res) => {
                dispatch(setPending(true))
            })
    }
    return (
        <div>
            <ReservationList>
                <div title={props.fio}>{props.fio.length <= 2 ? <span style={{color: 'red'}}>Отсутсвует</span> : props.fio}</div>
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
            <ModalWrapper onModal={onModal} onClickAway={onModal} width={'450'} height={'400'} visible={visible}>
                <div className={css.removed}>
                    <h1>Бронирование было отменено!</h1>
                    <span onClick={onModal}><GreenBtn>ОК</GreenBtn></span>
                </div>
            </ModalWrapper>
            <ModalWrapper onModal={onChatCreate} onClickAway={onChatCreate} width={'450'} height={'400'} visible={approved}>
                <div className={css.removed}>
                    <h2>Бронирование успешно подтверждено!</h2>
                    <span onClick={onChatCreate}><GreenBtn>ОК</GreenBtn></span>
                </div>
            </ModalWrapper>
            <ModalWrapper onModal={onError} onClickAway={onError} width={'450'} height={'400'} visible={error}>
                <div className={css.removed}>
                    <h2>{err}</h2>
                    <span onClick={onError}><GreenBtn>ОК</GreenBtn></span>
                </div>
            </ModalWrapper>
        </div>
    )
}

export default Reservation