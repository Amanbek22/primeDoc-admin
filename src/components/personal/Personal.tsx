import React, {useEffect, useState} from 'react'
import {
    BtnFloat,
    GreenBtn, Input,
    Last, ModalBtnWrapper,
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
import PhoneInput from "react-phone-input-2";
import {FormModalWrapper, Title} from "../admin/AdminComponents";

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
        }, () => {
            setPending(false)
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

    const [modalText, setModalText] = useState('')
    const [modal, setModal] = useState(false)
    const onModal = () => setModal(!modal)
    const success = (str:string) => {
        setModalText(str)
        onModal()
        // props.setPending()
    }
    const deleteDoctor = () => {
        requestCheck(()=>api.delDoctor(props.id))
            .then((res: any) => {
                success(res.data)
            })
    }
    const deactivateDoctor = () => {
        requestCheck(() => api.deactivateDoctor(props.id))
            .then((res:any) => {
                success(res.data)
            })
    }
    const [deactivateModal, setDeactivateModal] = useState(false)
    const [editVisible, setEditVisible] = useState(false)
    const [visible, setVisible] = useState(false)

    const onVisible = () => setVisible(!visible)
    const onEditModal = () => setEditVisible(!editVisible)
    const onDeactivateModal = () => setDeactivateModal(!deactivateModal)

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
            username: '+' + email,
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
                    <EditDeleteComponent editing={false} onEdit={onEditModal} onModal={onVisible} onDone={setDoctor}/>
                    <span onClick={onDeactivateModal} className={css.deactivate} > <img src="https://www.flaticon.com/svg/static/icons/svg/1437/1437748.svg" width={'25px'} alt="#"/></span>
                </Last>
            </TableList>
            <ModalWrapper onModal={onEditModal} visible={editVisible} width={"450"} height={"520"}
                          onClickAway={onEditModal}>
                <form onSubmit={setDoctor} className={css.editWrapper}>
                    <Input required onChange={(e) => setFio(e.target.value)} type="text" value={fio}/>
                    <Input required onChange={(e) => setLastName(e.target.value)} type="text" value={lastName}/>
                    <Input onChange={(e) => setPatronymic(e.target.value)} type="text" value={patronymic}/>
                    <Select isMulti options={options} placeholder={'Направление'}  onChange={(e) => setDirection(e)} value={direction}/>
                    {/*<Input onChange={(e) => setDirection(e.target.value)} type="text" value={direction}/>*/}
                    <PhoneInput country={'kg'} inputClass={css.inputClass} containerClass={css.container} onChange={(e) => setEmail(e)} value={email}/>
                    <GreenBtn>Сохранить</GreenBtn>
                </form>
            </ModalWrapper>
            <ModalWrapper onModal={onVisible} visible={visible} width={"450"} height={"400"} onClickAway={onVisible}>
                <DeleteModal text={'Вы уверены что хотите удалить?'} onModal={onVisible} title={fio + ' ' + lastName + ' ' + patronymic}
                             del={deleteDoctor}/>
            </ModalWrapper>

            <ModalWrapper onModal={onDeactivateModal} visible={deactivateModal} width={"450"} height={"400"} onClickAway={onDeactivateModal}>
                <DeleteModal text={`Вы уверены что хотите деактивировать`} onModal={onDeactivateModal} title={fio + ' ' + lastName + ' ' + patronymic}
                             del={deactivateDoctor}/>
            </ModalWrapper>

            <ModalWrapper onModal={onModal} visible={modal} width={"450"} height={"400"} onClickAway={onModal}>
                <FormModalWrapper>
                    <Title style={{
                        textAlign: "center",
                        marginTop: "120px"
                    }}>{modalText}</Title>
                    <ModalBtnWrapper>
                        <GreenBtn className={css.btns} onClick={()=> {
                            onModal()
                            props.setPending()
                        }}>ОК</GreenBtn>
                    </ModalBtnWrapper>
                </FormModalWrapper>
            </ModalWrapper>
        </div>
    )
}