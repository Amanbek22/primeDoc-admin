import React from 'react'
import css from './medCarts.module.css'
import {AdminHeader, Line} from "../mainStyledComponents/MainStyledComponents";

const MedCarts = () => {
    return (
        <div>
            <AdminHeader>Медицинская карта</AdminHeader>
            <Line/>

            <div className={css.tableWrapper}>
                <div className={css.header}>
                    <div>
                        ФИО
                    </div>

                    <div>
                        Дата рождения
                    </div>
                    <div>
                        WhatsApp номер
                    </div>
                    <div className={css.last}>
                        Фотография
                    </div>
                </div>
                <List fio={'Asylbekov Asylbekov Amanbek Taalaibekovich'} date={'22.11.2000'} number={'0708626798'} />
                <List fio={'Asylbekov Asylbekov Amanbek Taalaibekovich'} date={'22.11.2000'} number={'0708626798'} />
                <List fio={'Asylbekov Asylbekov Amanbek Taalaibekovich'} date={'22.11.2000'} number={'0708626798'} />
                <List fio={'Asylbekov Asylbekov Amanbek Taalaibekovich'} date={'22.11.2000'} number={'0708626798'} />
            </div>
        </div>
    )
}

type ListProps = {
    fio: string,
    date: string,
    number: string,
}

const List: React.FC<ListProps> = (props) => {
    return (
        <div>
            <div className={css.list}>
                <div>
                    {props.fio}
                </div>

                <div>
                    {props.date}
                </div>
                <div>
                    {props.number}
                </div>
                <div className={css.watchPicture}>
                    Посмотреть фото
                </div>
            </div>
        </div>
    )
}


export default MedCarts
