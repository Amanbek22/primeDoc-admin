import React from 'react'
import css from './create-time.module.css'
import del from '../../img/delete.png'
import {DatePicker} from "@y0c/react-datepicker";
import 'dayjs/locale/ru'
import './date.scss'

const Time = () => {
    // const [start, setStart] = useState(null)
    const clocks = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
    return (
        <>
            <div className={css.timeWrapper}>
                <label>
                    <span>От</span>
                    <select className={css.timePicker} autoFocus={true}>
                        <option value="">Часы</option>
                        {
                            clocks.map((item) => {
                                return <option value={item} key={item}>{item}</option>
                            })
                        }
                    </select>
                    <select className={css.minPicker}>
                        <option value="">Минуты</option>
                        <option value="00">00</option>
                        <option value="30">30</option>
                    </select>
                </label>

                <label>
                    <span>До</span>
                    <select className={css.timePicker} autoFocus={true}>
                        <option value="">Часы</option>
                        {
                            clocks.map((item) => {
                                return <option value={item} key={item}>{item}</option>
                            })
                        }
                    </select>
                    <select className={css.minPicker}>
                        <option value="">Минуты</option>
                        <option value="00">00</option>
                        <option value="30">30</option>
                    </select>
                </label>
                <img src={del} alt="#"/>
            </div>
        </>
    )
}

export default Time


export const Date = () => {
    const days = ['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье']
    return (
        <>
            {/*<select className={css.datePicker}>*/}
            {/*    {*/}
            {/*        days.map((item) => {*/}
            {/*            return <option value={item} key={item}>{item}</option>*/}
            {/*        })*/}
            {/*    }*/}
            {/*</select>*/}
            <DatePicker locale={'ru'} multiple onChange={(e) => console.log(e)}/>
        </>
    )
}