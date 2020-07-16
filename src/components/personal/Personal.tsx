import React, {useEffect, useState} from 'react'
import {
    BtnFloat,
    EditDelete,
    GreenBtn,
    Last,
    TableHeader,
    TableList,
    TableWrapper,
    ModalBtnWrapper
} from "../mainStyledComponents/MainStyledComponents";
import {useDispatch} from "react-redux";
import {setHeader} from "../../state/appReducer";
import edit from "../../img/edit.png";
import del from "../../img/delete.png";
import {Link} from "react-router-dom";
import api from "../../api/Api";
import Pending from '../preloader/Preloader'
import ModalWrapper from "../modal/Modal";
import DeleteModal from "../utils/DeleteModal";
import EditDeleteComponent from "../utils/EditDelete";

type Props = {}
const Personal: React.FC<Props> = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setHeader("Персонал"))
    }, [dispatch])

    const [doctors, setDoctors] = useState([])
    const [pending, setPending] = useState(true)

    useEffect(()=>{
        api.getDoctor().then((res:any)=>{
            setDoctors(res.data)
            setPending(false)
        },(error:any)=>console.error(error))
        console.log(doctors)
    }, [])

    if (pending){
        return <Pending />
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
                    doctors.map((item:any)=> <List id={item.id} key={item.id} fio={'Adsnfasgn ADomdlm'} direction={'terapevt'} email={'sadadaad'} />)
                }
            </TableWrapper>
            <BtnFloat>
                <Link to={'/personal/5'}>
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
    direction: string
    email: string
}


const List: React.FC<ListProps> = (props) => {
    const deleteDoctor = () => {
        api.delDoctor(props.id)
            .then((res:any)=>{
                console.log(res)
            })
    }
    const [visible, setVisible] = useState(false)
    const [editing, setEditing] = useState(false)
    const onModal = () => setVisible(!visible)

    const [fio, setFio] = useState(props.fio)
    const [direction, setDirection] = useState(props.direction)
    const [email, setEmail] = useState(props.email)

    const onEdit = () => setEditing(!editing)
    const setDoctor = () => {
        onEdit()
        alert(fio + direction + email)
    }
    return (
        <div>
            <TableList>
                <div>
                    {
                        editing ? <input onChange={(e)=>setFio(e.target.value)} type="text" value={fio}/> : fio
                    }
                </div>
                <div>
                    {
                        editing ? <input onChange={(e)=>setDirection(e.target.value)} type="text" value={direction}/> : direction
                    }
                </div>
                <div>
                    {
                        editing ? <input onChange={(e)=>setEmail(e.target.value)} type="text" value={email}/> : email
                    }
                </div>
                <Last>
                    {/*<EditDelete>*/}
                    {/*    {*/}
                    {/*        editing*/}
                    {/*            ? <img onClick={setDoctor} src="https://image.flaticon.com/icons/svg/1632/1632596.svg" alt="done"/>*/}
                    {/*            : <img onClick={onEdit} src={edit} alt="edit"/>*/}
                    {/*    }*/}
                    {/*    <img onClick={onModal} src={del} alt="delete"/>*/}
                    {/*</EditDelete>*/}
                    <EditDeleteComponent editing={editing} onEdit={onEdit} onModal={onModal} onDone={setDoctor} />
                </Last>
            </TableList>
            <ModalWrapper onModal={onModal} visible={visible} width={"450"} height={"400"} onClickAway={onModal}>
                <DeleteModal text={'Вы уверены что хотите удалить'} onModal={onModal} title={props.fio} del={deleteDoctor}/>
            </ModalWrapper>
        </div>
    )
}