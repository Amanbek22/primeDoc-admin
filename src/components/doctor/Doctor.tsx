import React, {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import api from '../../api/Api'
import Preloader from "../preloader/Preloader";
import {
    DownloadPictureWrapper,
    GreenBtn, GreenDiv,
    HeaderWrapper,
    InputNone,
    Weeks,
    WeeksWrapper
} from "../mainStyledComponents/MainStyledComponents";
import css from './doctor.module.css'
import {useDispatch} from "react-redux";
import {setHeader} from "../../state/appReducer";
import CreateTimeTable from "../create-time-table/CreateTimeTable";
import {checkToken} from "../../state/authReducer";
import ModalWrapper from "../modal/Modal";
import pic from "../../img/pic.png";

type DoctorProps = {}
const Doctor: React.FC<DoctorProps> = React.memo(() => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setHeader('Подробно о враче'))
    }, [dispatch])
    const requestCheck = async (req: any) => {
        return dispatch(checkToken(req))
    }
    const params: any = useParams()
    const [pending, setPending] = useState(true)
    const [user, setUser] = useState<any>(null)
    const [image, setImage] = useState<string | null>(null)
    const [visible, setVisible] = useState(false)
    const [img, setImg] = useState('')
    const [img2, setImg2] = useState('')

    const onModal = () => setVisible(!visible)

    useEffect(() => {
        requestCheck(() => api.getDoc(params.id))
            .then((res: any) => {
                setUser(res.data)
                setImage(res.data.image)
                setPending(false)
            })
    }, [pending])

    const uploadPhoto = () => {
        const formData = new FormData()
        formData.append('imageFile', img)
        setImg('')
        setImage(null)
        requestCheck( () => api.setDoctorImage(params.id, formData))
            .then((res:any)=> {
                onModal()
                setImage(res.data.image)
                setPending(true)
            }, () =>{
                onModal()
                setPending(true)
            })
    }

    if (pending) {
        return <Preloader/>
    }
    return (
        <div>
            <ModalWrapper onModal={onModal} visible={visible} width={"450"} height={"400"} onClickAway={onModal}>
                <div className={css.addPhotoModal}>
                    <label>
                        <InputNone onChange={(e: any) => {
                            const reader = new FileReader();
                            reader.readAsDataURL(e.target.files[0]);
                            reader.onload = (e: any) => {
                                setImg2(e.target.result)
                            }
                            setImg(e.target.files[0])
                        }} type={'file'}/>
                        <DownloadPictureWrapper>
                            <img src={img2 ? img2 : pic} alt="pic"/>
                        </DownloadPictureWrapper>
                        <GreenDiv>Загрузить фото</GreenDiv>
                    </label>
                    <GreenBtn onClick={uploadPhoto} disabled={!img}>Сохранить</GreenBtn>
                </div>
            </ModalWrapper>
            <HeaderWrapper>
                <span className={css.logo} onClick={onModal}>
                    <span className={css.plusWrapper}>
                        <img className={css.plus} src="https://image.flaticon.com/icons/png/512/32/32339.png" alt="+"/>
                    </span>
                    <img
                        src={image ? image : "https://mediator.kg/wp-content/themes/twentynineteen/images/avatar-no-photo.png"}
                        alt={user?.firstName}
                    />
                </span>
                <div>
                    <div className={css.name}>
                        {user?.lastName + ' '}
                        {user?.firstName + ' '}
                        {user?.patronymic}
                    </div>
                    <p className={css.categories}>
                        {
                            user?.categories?.map((item: any, index: number) => {
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
                        <div
                            className={css.date}>{item.end ? item?.start + ' - ' + item?.end : item.start + ' - ' + 'по настоящее время'}</div>
                        <p className={css.text}>{item.name}</p>
                        <p className={css.text}>{item.organizationName}</p>
                    </div>)
                }
            </div>
            <div>
                <div className={css.title}>Расписание</div>
                <Schedule setPending={() => setPending(!pending)} id={params.id}/>
            </div>
        </div>
    );
});

type ScheduleProps = {
    id: number
    setPending: () => void
}
const Schedule = (props: ScheduleProps) => {
    const dispatch = useDispatch()
    const params: any = useParams()
    const history = useHistory()
    const requestCheck = async (req: any) => {
        return dispatch(checkToken(req))
    }
    const [schedule, setSchedule] = useState<any>(null)
    const [edit, setEdit] = useState(false)
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    useEffect(() => {
        requestCheck(() => api.getSchedule(props.id))
            .then((res: any) => {
                // setSchedule(res.data)
                const newData: any = {
                    ...res.data,
                    weeks: res.data.weeks.map((item: any) => ({
                        days: days.map((i: any) => {
                            let day: any = {
                                list: [],
                                weekDayName: i
                            }
                            item.weekDays.forEach((k: any) => k.intervals.forEach((f: any) => {
                                    if (i === k.weekDayName) {
                                        let start = f.start.split(':')
                                        let end = f.end.split(':')
                                        day.list.push({
                                            fromH: start[0],
                                            fromM: start[1],
                                            toH: end[0],
                                            toM: end[1],
                                        })
                                    }
                                })
                            )
                            return day
                        })
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
                    : schedule ? <CreateTimeTable setPending={props.setPending} data={schedule} id={props.id}/> : null
            }
            <br/>
            {
                schedule
                    ? <GreenBtn onClick={() => setEdit(!edit)}>{!edit ? 'Изменить расписание' : 'Отменить'}</GreenBtn>
                    : <GreenBtn onClick={() => history.push(`/personal/0/add/${params?.id}`)}>Добавить
                        расписание</GreenBtn>
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
                    props?.list.map((item: any, index: number) => item ? <div className={css.schedule}
                                                                              key={index}>
                        <span>
                            {
                                (Number(item.fromH) + 6) > 24
                                    ? '0' + ((Number(item.fromH) + 6) - 24)
                                    : ((Number(item.fromH) + 6).toString().length === 1
                                    ? '0' + (Number(item.fromH) + 6)
                                    : Number(item.fromH) + 6) === 24
                                    ? '00'
                                    : (Number(item.fromH) + 6) < 10 ? '0' + (Number(item.fromH) + 6) : (Number(item.fromH) + 6)} : {item.fromM} </span>
                        |
                        <span>
                            {
                                (Number(item.toH) + 6) > 24
                                    ? '0' + ((Number(item.toH) + 6) - 24)
                                    : ((Number(item.toH) + 6).toString().length === 1
                                    ? '0' + (Number(item.toH) + 6)
                                    : Number(item.toH) + 6)} : {item.toM}
                        </span>
                    </div> : null)
                }
            </div>
        </div>
    )
}

export default Doctor;