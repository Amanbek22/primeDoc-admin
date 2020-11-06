import React, {useEffect, useState} from 'react'
import {useDispatch} from "react-redux";
import {setHeader} from "../../state/appReducer";
import {Title} from "../admin/AdminComponents";
import Time, {Date as Dat} from "./Time";
import css from './create-time.module.css'
import {GreenBtn, Weeks, WeeksWrapper} from "../mainStyledComponents/MainStyledComponents";
import Api from '../../api/Api'
import {useParams, useHistory} from 'react-router-dom';
import del from "../../img/delete.png";
import {checkToken} from "../../state/authReducer";


export class Schedule {
    fromH: string | null
    fromM: string | null
    toH: string | null
    toM: string | null

    constructor() {
        this.fromH = null;
        this.fromM = null;
        this.toH = null;
        this.toM = null;
    }
}

export class day {
    list: any
    weekDayName: string | null

    constructor(name: string) {
        this.list = [new Schedule()]
        this.weekDayName = name
    }
}

export class week {
    days: any

    constructor() {
        this.days = [
            new day('Monday'),
            new day('Tuesday'),
            new day('Wednesday'),
            new day('Thursday'),
            new day('Friday'),
            new day('Saturday'),
            new day('Sunday'),
        ]
    }
}

const CreateTimeTable = (props: any) => {
    const dispatch = useDispatch()
    useEffect(() => {
        if (!props.data) {
            dispatch(setHeader("Создание расписания"))
        }
    }, [dispatch])
    const requestCheck = async (req: any) => {
        return dispatch(checkToken(req))
    }
    const params: any = useParams()
    const history = useHistory()

    const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
    const option = days.map((item, index) => ({
        value: index + 1,
        label: item
    }))

    const [doctorId, setDoctorId] = useState(0)
    const [currentWeek, setCurrentWeek] = useState(0)
    const [step, setStep] = useState(0)
    const [val, setVal] = useState(null)
    const [weeks, setWeeks] = useState([
        new week()
    ])
    useEffect(() => {
        if (props.data) {
            let weeks = [...props.data?.weeks]
            let newWeeks = [...props.data?.weeks]
            weeks.forEach((week, index) => {
                // console.log(week, index)
                week.days.forEach((day:any, dayIndex: number) => {
                    // console.log(day, dayIndex)
                    day.list.forEach((interval:any, intervalIndex:number) => {
                        let fromH = +newWeeks[index].days[dayIndex].list[intervalIndex].fromH + 6
                        let toH = +newWeeks[index].days[dayIndex].list[intervalIndex].toH + 6
                        newWeeks[index].days[dayIndex].list[intervalIndex].fromH = fromH >= 24 ? '0'+(fromH - 24) : fromH
                        newWeeks[index].days[dayIndex].list[intervalIndex].toH = toH >= 24 ? '0'+(toH - 24) : toH
                        // console.log(newWeeks[index].days[dayIndex].list[intervalIndex])
                    })
                })
            })
            // console.log([...props.data?.weeks])
            // console.log(newWeeks)
            setWeeks(weeks)
            setDoctorId(props.id)
        }
    }, [props.data])
    const setTimeFromH = (e: any, days: number, listIndex: number, place: any) => {
        switch (place) {
            case 'fromH':
                weeks[currentWeek].days[days].list[listIndex].fromH = e
                break
            case 'fromM':
                weeks[currentWeek].days[days].list[listIndex].fromM = e
                break
            case 'toH':
                weeks[currentWeek].days[days].list[listIndex].toH = e
                break
            case 'toM':
                weeks[currentWeek].days[days].list[listIndex].toM = e
                break
            default:
                return null
        }
        setWeeks([...weeks])
    }
    const addSchedule = (days: number) => {
        weeks[currentWeek].days[days].list = [...weeks[currentWeek].days[days].list, new Schedule()]
        setWeeks([...weeks])
    }
    const removeSchedule = (days: number, i: number) => {
        weeks[currentWeek].days[days].list.splice(i, 1)
        setWeeks([...weeks])
    }
    const addWeek = () => {
        setWeeks([...weeks, new week()])
    }
    const delWeek = (index: number) => {
        weeks.splice(index, 1)
        setWeeks([...weeks])
    }
    const setData = (e: any) => {
        setVal(e)
        setStep(e.value)
    }
    const Generate = (id: number) => requestCheck(()=> Api.approveSchedule(id))
    const submit = async (e: any) => {
        e.preventDefault()
        let status: boolean = true
        const schedule = {
            doctorId: params.time | doctorId,
            currentWeek: 1,
            weekDuration: weeks.length,
            weeks: weeks.map((item, index) => ({
                weekDays: item.days.map((i: any) => {
                    return {
                        intervals: i.list.map((j: any) => {
                            if (j && j.toH && j.toM && j.fromH && j.fromM) {
                                let endHour = (Number(j.toH) - 6).toString()
                                let startHour = (Number(j.fromH) - 6).toString()
                                return {
                                    end: j.toH && j.toM ? (endHour.length === 1 && Number(endHour) > 0 ? '0' + endHour : (Number(endHour) > 0 ? endHour : 24 + Number(endHour) )) + ':' + j.toM + ':' + '00' : '',
                                    start: j.fromH && j.fromM ? (startHour.length === 1 && Number(startHour) > 0  ? '0' + startHour : (Number(startHour) > 0 ? startHour : 24 + Number(startHour) ) ) + ':' + j.fromM + ':' + '00' : ''
                                }
                            }else{
                                status = false
                                return null
                            }
                        }),
                        weekDayName: i.weekDayName
                    }
                }),
                weekOrder: index + 1
            }))
        }

        let res:any = await schedule.weeks.map((item: any) => item.weekDays.map((i: any) => {
            if(!i.intervals.length){
                return null
            }
            return  i
        }))

        let filteredWeeks = await res.map((item:any) => item.filter((time:any) => time !== null))
        let newSchedule = {
            ...schedule,
            weeks: filteredWeeks.map((week:any, index:number) => ({weekDays: week, weekOrder: index+1}))
        }
        // console.log(schedule)
        // console.log(newSchedule)

        if (props.data && status) {
            requestCheck(() => Api.deleteSchedule(props.data.id))
                .then(() => {
                    requestCheck(() => Api.createSchedule(newSchedule))
                        .then(() => {
                            // Generate(res.data.id)
                            props.setPending()
                        })
                })
        } else {
            requestCheck(() => Api.createSchedule(newSchedule))
                .then((res: any) => {
                    Generate(res.data.id)
                    history.push('/personal')
                })
        }
    }
    const changeWeek = (index: number) => {
        setVal(null)
        setStep(0)
        setCurrentWeek(index)
    }
    return (
        <>
            {/*<Title>Расписание</Title>*/}
            <form onSubmit={submit} className={css.wrapper}>
                <div>
                    <Title>Дни недели</Title>
                    <WeeksWrapper>
                        <Weeks>
                            {
                                weeks.map((item, index) => <div key={index}>
                                        <Week onDel={() => delWeek(index)} setWeek={() => changeWeek(index)}
                                              current={currentWeek + 1} index={index + 1}/>
                                    </div>
                                )
                            }
                            <div className={css.add} onClick={addWeek}>
                                + Добавить
                            </div>
                        </Weeks>
                        <div>
                            <Dat options={option} val={val} setVal={setData}/>
                            <Title>Интервалы</Title>
                            {!step && (<div/>)}
                            {
                                weeks[currentWeek]?.days.map((item: any, index: number) => {
                                    return step === index + 1 && (
                                        <StepForm removeSchedule={removeSchedule} addSchedule={addSchedule} key={index}
                                                  setTimeFromH={setTimeFromH}
                                                  days={index} listSchedules={weeks[currentWeek].days[index].list}/>
                                    )
                                })
                            }
                            <GreenBtn>Сохранить</GreenBtn>
                        </div>
                    </WeeksWrapper>
                </div>
            </form>
        </>
    )
}

type WeekProps = {
    index: number
    current: number
    setWeek: any
    onDel: any
}
const Week = (props: WeekProps) => {
    return (
        <div className={props.current === props.index ? css.active + ' ' + css.week : css.week}>
            <div onClick={props.setWeek}>{props.index} неделя</div>
            <div className={css.imgWrapper}>
                <img onClick={props.onDel} className={css.del} src={del}
                     alt="#"/>
            </div>
        </div>
    )
}


type StepType = {
    listSchedules?: any
    setTimeFromH?: any
    days: number
    addSchedule?: any
    removeSchedule?: any
}
const StepForm = (props: StepType) => {
    return (
        <div>
            <div className={css.timeList}>
                {
                    props.listSchedules.map((item: any, index: number) => item ? <Time
                        removeSchedule={props.removeSchedule}
                        startH={item.fromH}
                        startM={item.fromM}
                        endH={item.toH}
                        endM={item.toM}

                        index={index}
                        days={props.days}

                        setStartH={props.setTimeFromH}
                        setStartM={props.setTimeFromH}
                        setEndH={props.setTimeFromH}
                        setEndM={props.setTimeFromH}

                        key={index}/> : null)
                }
            </div>
            <Title className={css.addTime}
                   onClick={() => props.addSchedule(props.days)}
            >
                Добавить интервал работы
                <span className={css.plus}>+</span>
            </Title>
        </div>
    )
}

export default CreateTimeTable