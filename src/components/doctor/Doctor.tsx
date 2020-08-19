import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import api from '../../api/Api'
import Preloader from "../preloader/Preloader";
import {HeaderWrapper} from "../mainStyledComponents/MainStyledComponents";
import css from './doctor.module.css'
import {useDispatch} from "react-redux";
import {setHeader} from "../../state/appReducer";
import CreateTimeTable from "../create-time-table/CreateTimeTable";

type DoctorProps = {}
const Doctor: React.FC<DoctorProps> = React.memo(() => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setHeader('Подробно о враче'))
    }, [dispatch])
    const params: any = useParams()
    const [pending, setPending] = useState(true)
    const [user, setUser] = useState<any>(null)
    const [image, setImage] = useState<string | null>(null)

    useEffect(() => {
        api.getDoc(params.id)
            .then((res) => {
                setPending(false)
                setUser(res.data)
                setImage(res.data.image)
            })
    }, [])

    if (pending) {
        return <Preloader/>
    }
    return (
        <div>
            <HeaderWrapper>
                <span className={css.logo}>
                    <img
                        src={image ? "data:image/jpg;base64," + image : "https://image.freepik.com/free-photo/front-view-doctor-with-medical-mask-posing-with-crossed-arms_23-2148445082.jpg"}
                        alt={user?.firstName}/>
                </span>
                <div>
                    <div className={css.name}>
                        {user?.lastName + ' '}
                        {user?.firstName + ' '}
                        {user?.patronymic}
                    </div>
                    <p className={css.categories}>
                        {
                            user?.categories.map((item: any, index: number) => {
                                return <span
                                    key={item.id}>{item.name}{index === user.categories.length - 1 ? null : ', '}</span>
                            })
                        }
                    </p>
                    <p className={css.categories}>{
                        user?.username
                    }</p>
                    <p className={css.categories}>
                        Стаж 25 лет
                    </p>
                </div>
            </HeaderWrapper>
            <div>
                <div className={css.title}>О враче</div>
                <p className={css.text}>{user?.bio}</p>
            </div>
            <div>
                <div className={css.title}>Образование</div>
                {
                    user?.information.map((item: any, index: number) => <div key={index}>
                        <div className={css.date}>{item.start + ' - ' + item?.end}</div>
                        <p className={css.text}>{item.name}</p>
                        <p className={css.text}>{item.organizationName}</p>
                    </div>)
                }
            </div>
            <div>
                <div className={css.title}>Расписание</div>
                <Schedule id={params.id}/>
            </div>
        </div>
    );
});

type ScheduleProps = {
    id: number
}
const Schedule = (props: ScheduleProps) => {
    const [schedule, setSchedule] = useState<any>(null)
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    useEffect(() => {
        api.getSchedule(props.id)
            .then((res) => {
                // setSchedule(res.data)
                const newData = {
                    ...res.data,
                    weeks: res.data.weeks.map((item: any) => ({
                        days: days.map((i: any) => ({
                            list: item.weekDays.map((k: any) => {
                                let obj:any  = null;
                                k.intervals.forEach((f: any) => {
                                    if (i === k.weekDayName) {
                                        let start = f.start.split(':')
                                        let end = f.end.split(':')
                                        obj = {
                                            fromH: start[0],
                                            fromM: start[1],
                                            toH: end[0],
                                            toM: end[1],
                                        }
                                    }
                                })
                                return obj
                            }),
                            weekDayName: i
                        }))
                    }))
                }
                setSchedule(newData)
                console.log('old Schedule', res.data)
                console.log('new Schedule', newData)
            }, (error: any) => {
                console.log('no schedules', error)
            })
    }, [])
    return (
        <div>
            {
                schedule
                    ? <CreateTimeTable data={schedule} id={props.id}/>
                    : null
            }
        </div>
    )
}


export default Doctor;