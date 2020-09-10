import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
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

const Reservation = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setHeader("Бронь"))
    }, [dispatch])
    return (
        <>
            <TableWrapper>
                <ReservationHeader>
                    <div>
                        ФИО
                    </div>
                    <div>
                        Номер телефона
                    </div>
                    <div>
                        Направление
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
                <List
                    fio={'Asylbekov Amanbek'}
                    number={'0708626798'}
                    category={'ЛОР'}
                    date={'10.09.2020'}
                    from={'15:30'}
                    to={'16:30'}
                    reject={()=>alert('Delete')}
                    resolve={()=>alert('Accept')}
                />
            </TableWrapper>
        </>
    )
}

type ListProps = {
    fio: string
    number: number | string
    category: string
    date: string
    from: string
    to: string
    resolve: () => void
    reject: () => void
}
const List: React.FC<ListProps> = (props) => {
    return (
        <div>
            <ReservationList>
                <div title={props.fio}>{props.fio}</div>
                <div>{props.number}</div>
                <div>{props.category}</div>
                <div>{props.date}</div>
                <div>{props.from}</div>
                <div>{props.to}</div>
                <Center>
                    <img onClick={props.resolve} src={done} alt="одобрить"/>
                </Center>
                <Last>
                    <img onClick={props.reject} src={reject} alt="откланить"/>
                </Last>
            </ReservationList>
        </div>
    )
}

export default Reservation