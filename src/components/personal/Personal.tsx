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

type Props = {}
const Personal: React.FC<Props> = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setHeader("Персонал"))
    }, [dispatch])

    const [doctors, setDoctors] = useState([])
    const [pending, setPending] = useState(true)

    useEffect(() => {
        api.getDoctor().then((res: any) => {
            setDoctors(res.data)
            setPending(false)
        }, (error: any) => {
            setPending(false)
            console.error(error)
        })
        api.getSchedule().then((res) => console.log(res))
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
                        Электронная почта
                    </div>
                    <Last>
                        Операции
                    </Last>
                </TableHeader>
                {
                    doctors.map((item: any) => <List
                        id={item.id}
                        key={item.id}
                        fio={item.firstName + ' ' + item.lastName}
                        direction={item.categories}
                        email={item.username}
                        setPending={()=>setPending(true)}
                    />)
                }
            </TableWrapper>
            <BtnFloat>
                <Link to={'/personal/add'}>
                    <GreenBtn>Создать врача</GreenBtn>
                </Link>
            </BtnFloat>
        </>
    )
}
export default Personal


type ListProps = {
    id: number
    fio: string
    direction: [any]
    email: string
    setPending: () => void
}


const List: React.FC<ListProps> = (props) => {
    const deleteDoctor = () => {
        api.delDoctor(props.id)
            .then((res: any) => {
                console.log(res)
                props.setPending()
            })
    }

    const [editVisible, setEditVisible] = useState(false)
    const [visible, setVisible] = useState(false)
    const onModal = () => setVisible(!visible)
    const onEditModal = () => setEditVisible(!editVisible)

    const [fio, setFio] = useState(props.fio)
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
        props.direction.forEach((item:any) =>arr.push(...options.filter((i:any) => +item.id === +i.value ? item : null )))
        setDirection(arr)
    }, [props.direction, options])

    const setDoctor = (e:any) => {
        e.preventDefault()
        let newFio = fio.split(' ')
        api.editDoctor(props.id, {
            categories: direction.map((item:any) => item.value),
            username: email,
            firstName: newFio[0],
            lastName: newFio[1] ? newFio[1] : '',
            patronymic: newFio[2] ? newFio[2] : ''
        })
            .then((res:any)=> console.log(res))
        onEditModal()
    }

    return (
        <div>
            <TableList>
                <div>{fio}</div>
                <div>{direction ? direction.map((item:any) => item.label + ', ') : ''}</div>
                <div>{email}</div>
                <Last>
                    <EditDeleteComponent editing={false} onEdit={onEditModal} onModal={onModal} onDone={setDoctor}/>
                </Last>
            </TableList>
            <ModalWrapper onModal={onEditModal} visible={editVisible} width={"450"} height={"400"}
                          onClickAway={onEditModal}>
                <form onSubmit={setDoctor} className={css.editWrapper}>
                    <Input required onChange={(e) => setFio(e.target.value)} type="text" value={fio}/>
                    <Select isMulti options={options} placeholder={'Направление'}  onChange={(e) => setDirection(e)} value={direction}/>
                    {/*<Input onChange={(e) => setDirection(e.target.value)} type="text" value={direction}/>*/}
                    <Input onChange={(e) => setEmail(e.target.value)} type="text" value={email}/>
                    <GreenBtn>Сохранить</GreenBtn>
                </form>
            </ModalWrapper>
            <ModalWrapper onModal={onModal} visible={visible} width={"450"} height={"400"} onClickAway={onModal}>
                <DeleteModal text={'Вы уверены что хотите удалить'} onModal={onModal} title={props.fio}
                             del={deleteDoctor}/>
            </ModalWrapper>
        </div>
    )
}