import React, {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import api from '../../api/Api'
import Preloader from "../preloader/Preloader";
import {GreenBtn, HeaderWrapper, Weeks, WeeksWrapper} from "../mainStyledComponents/MainStyledComponents";
import css from './doctor.module.css'
import {useDispatch} from "react-redux";
import {setHeader} from "../../state/appReducer";
import CreateTimeTable from "../create-time-table/CreateTimeTable";
import {checkToken} from "../../state/authReducer";

type DoctorProps = {}
const Doctor: React.FC<DoctorProps> = React.memo(() => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setHeader('Подробно о враче'))
    }, [dispatch])
    const requestCheck =  async (req:any) => {
        return dispatch(checkToken(req))
    }
    const params: any = useParams()
    const [pending, setPending] = useState(true)
    const [user, setUser] = useState<any>(null)
    const [image, setImage] = useState<string | null>(null)

    useEffect(() => {
        requestCheck(()=>api.getDoc(params.id))
            .then((res:any) => {
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
                    {/*<p className={css.categories}>*/}
                    {/*    Стаж 25 лет*/}
                    {/*</p>*/}
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
                        <div className={css.date}>{item.end ? item?.start + ' - ' + item?.end : item.start + ' - ' + 'по настоящее время'}</div>
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
    const dispatch = useDispatch()
    const params:any = useParams()
    const history = useHistory()
    const requestCheck =  async (req:any) => {
        return dispatch(checkToken(req))
    }
    const [schedule, setSchedule] = useState<any>(null)
    const [oldSchedule, setOldSchedule] = useState<any>([])
    const [edit, setEdit] = useState(false)
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    useEffect(() => {
        requestCheck(()=>api.getSchedule(props.id))
            .then((res:any) => {
                // setSchedule(res.data)
                const newData = {
                    ...res.data,
                    weeks: res.data.weeks.map((item: any) => ({
                        days: days.map((i: any) => ({
                            list: item.weekDays.map((k: any) => {
                                let obj: any = null;
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
            }, (error: any) => {
                console.log('no schedules', error)
            })
    }, [])
    return (
        <div>
            {
                !edit
                    ? <TimeTable data={schedule}/>
                    : schedule ? <CreateTimeTable data={schedule} id={props.id}/> : null
            }
            <br/>
            {
                schedule
                    ? <GreenBtn onClick={() => setEdit(!edit)}>{!edit ? 'Изменить расписание' : 'Отменить'}</GreenBtn>
                    : <GreenBtn onClick={()=>history.push(`/personal/0/add/${params?.id}`)}>Добавить расписание</GreenBtn>
            }
        </div>
    )
}

const ArrDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
type TimeTableProps = {
    data: any
}
const TimeTable: React.FC<TimeTableProps> = (props) => {
    const [current, setCurrent] = useState(0)
    return (
        <>
            {
                props.data
                    ? <WeeksWrapper>
                        <Weeks>
                            {
                                props.data?.weeks.map((item: any, index: number) => <div
                                    key={index}
                                    className={current === index ? css.week + ' ' + css.active : css.week}
                                    onClick={() => setCurrent(index)}
                                >{index + 1} неделя</div>)
                            }
                        </Weeks>
                        <Weeks>
                            {
                                props.data?.weeks[current].days.map((item: any, index: number) => <Days list={item.list}
                                                                                                        key={item.weekDayName}
                                                                                                        name={ArrDays[index]}/>)
                            }
                        </Weeks>
                    </WeeksWrapper>
                    : <div className={css.date}>Нет расписание</div>
            }
        </>
    )
}

type DaysProps = {
    name: string
    list: any
}
const Days: React.FC<DaysProps> = (props) => {
    return (
        <div className={css.days}>
            <div className={css.day}>{props.name}</div>
            <div className={css.schedules}>
                {
                    props?.list.map((item: any, index: number) => item ? <div className={css.schedule} key={index}>
                        <span> {item.fromH}:{item.fromM} </span>
                        |
                        <span> {item.toH}:{item.toM} </span>
                    </div> : null)
                }
            </div>
        </div>
    )
}

export default Doctor;