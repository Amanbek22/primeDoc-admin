import React, {useEffect, useState} from 'react'
import {
    BtnFloat,
    GreenBtn, Input,
    Last,
    TableHeader,
    TableList,
    TableWrapper
} from "../mainStyledComponents/MainStyledComponents";
import {useDispatch, useSelector} from "react-redux";
import {setHeader} from "../../state/appReducer";
import {Link} from "react-router-dom";
import api from "../../api/Api";
import Pending from '../preloader/Preloader'
import ModalWrapper from "../modal/Modal";
import DeleteModal from "../utils/DeleteModal";
import EditDeleteComponent from "../utils/EditDelete";
import css from './personal.module.css'
import Select from "react-select";
import {GlobalStateType} from "../../state/root-reducer";
import {getCategories} from "../../state/initial-selector";
import {checkToken} from "../../state/authReducer";

type Props = {}
const Personal: React.FC<Props> = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setHeader("Персонал"))
    }, [dispatch])
    const requestCheck =  async (req:any) => {
        return dispatch(checkToken(req))
    }
    const [doctors, setDoctors] = useState([])
    const [pending, setPending] = useState(true)

    useEffect(() => {
        requestCheck(api.getDoctor).then((res: any) => {
            setDoctors(res.data)
            setPending(false)
        }, (error: any) => {
            setPending(false)
            console.error(error)
        })
    }, [pending])

    if (pending) {
        return <Pending/>
    }
    return (
        <>
            <TableWrapper>
                <TableHeader>
                    <div>
                        ФИО
                    </div>

                    <div>
                        Направление
                    </div>
                    <div>
                        Номер
                    </div>
                    <Last>
                        Операции
                    </Last>
                </TableHeader>
                {
                    doctors.map((item: any) => <List
                        id={item.id}
                        key={item.id}
                        firstName={item.firstName}
                        lastName={item.lastName}
                        patronymic={item.patronymic}
                        direction={item.categories}
                        email={item.username}
                        setPending={()=>setPending(true)}
                    />)
                }
            </TableWrapper>
            <BtnFloat>
                <Link to={'/personal/0/add'}>
                    <GreenBtn>Создать врача</GreenBtn>
                </Link>
            </BtnFloat>
        </>
    )
}
export default Personal


type ListProps = {
    id: number
    firstName: string
    direction: [any]
    email: string
    lastName: string
    patronymic: string
    setPending: () => void
}


const List: React.FC<ListProps> = (props) => {
    const dispatch = useDispatch()
    const requestCheck =  async (req:any) => {
        return dispatch(checkToken(req))
    }
    const deleteDoctor = () => {
        requestCheck(()=>api.delDoctor(props.id))
            .then((res: any) => {
                console.log(res)
                props.setPending()
            })
    }

    const [editVisible, setEditVisible] = useState(false)
    const [visible, setVisible] = useState(false)
    const onModal = () => setVisible(!visible)
    const onEditModal = () => setEditVisible(!editVisible)

    const [fio, setFio] = useState(props.firstName)
    const [lastName, setLastName] = useState(props.lastName)
    const [patronymic, setPatronymic] = useState(props.patronymic)
    const [direction, setDirection] = useState<any>([])
    const [email, setEmail] = useState(props.email)
    const [options, setOptions] = useState<any>([])
    const categories = useSelector((state: GlobalStateType) => getCategories(state))

    useEffect(()=>{
        const data = categories.map((item:any) =>({
            value: item.id,
            label: item.name
        }))
        setOptions(data)
    }, [categories])

    useEffect(()=>{
        let arr:any = []
        props?.direction?.forEach((item:any) =>arr.push(...options.filter((i:any) => +item.id === +i.value ? item : null )))
        setDirection(arr)
    }, [props.direction, options])

    const setDoctor = (e:any) => {
        e.preventDefault()
        requestCheck(()=>api.editDoctor(props.id, {
            categories: direction.map((item:any) => item.value),
            username: email,
            firstName: fio,
            lastName: lastName,
            patronymic: patronymic
        }))
            .then((res:any)=> console.log(res))
        onEditModal()
    }

    return (
        <div>
            <TableList>
                <Link to={`/personal/${props.id}`}>{fio + ' ' + lastName + ' ' + patronymic}</Link>
                <div title={direction ? direction.map((item:any) => item.label + ', ') : ''}>{direction ? direction.map((item:any, index:number) => index+1 !== direction.length ? item.label + ', ' : item.label) : ''}</div>
                <div>{email}</div>
                <Last>
                    <EditDeleteComponent editing={false} onEdit={onEditModal} onModal={onModal} onDone={setDoctor}/>
                </Last>
            </TableList>
            <ModalWrapper onModal={onEditModal} visible={editVisible} width={"450"} height={"520"}
                          onClickAway={onEditModal}>
                <form onSubmit={setDoctor} className={css.editWrapper}>
                    <Input required onChange={(e) => setFio(e.target.value)} type="text" value={fio}/>
                    <Input required onChange={(e) => setLastName(e.target.value)} type="text" value={lastName}/>
                    <Input required onChange={(e) => setPatronymic(e.target.value)} type="text" value={patronymic}/>
                    <Select isMulti options={options} placeholder={'Направление'}  onChange={(e) => setDirection(e)} value={direction}/>
                    {/*<Input onChange={(e) => setDirection(e.target.value)} type="text" value={direction}/>*/}
                    <Input onChange={(e) => setEmail(e.target.value)} type="text" value={email}/>
                    <GreenBtn>Сохранить</GreenBtn>
                </form>
            </ModalWrapper>
            <ModalWrapper onModal={onModal} visible={visible} width={"450"} height={"400"} onClickAway={onModal}>
                <DeleteModal text={'Вы уверены что хотите удалить'} onModal={onModal} title={fio + ' ' + lastName + ' ' + patronymic}
                             del={deleteDoctor}/>
            </ModalWrapper>
        </div>
    )
}