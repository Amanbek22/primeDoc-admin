import React, {useEffect, useState} from 'react'
import {
    BtnFloat,
    EditDelete,
    GreenBtn,
    Last,
    TableHeader,
    TableList,
    TableWrapper
} from "../mainStyledComponents/MainStyledComponents";
import {useDispatch} from "react-redux";
import {setHeader} from "../../state/appReducer";
import edit from "../../img/edit.png";
import del from "../../img/delete.png";
import {Link} from "react-router-dom";
import api from "../../api/Api";
import Pending from '../preloader/Preloader'

type Props = {}
const Personal: React.FC<Props> = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setHeader("Персонал"))
    }, [dispatch])

    const [doctors, setDoctors] = useState([])
    const [pending, setPending] = useState(true)

    console.log(doctors)

    useEffect(()=>{
        api.getDoctor().then((res:any)=>{
            setDoctors(res.data)
            setPending(false)
        },(error:any)=>console.error(error))
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
                    doctors.map((item:any)=> <List key={item.id} fio={'Adsnfasgn ADomdlm'} direction={'terapevt'} email={'sadadaad'} />)
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
    fio: string,
    direction: string,
    email: string,
}


const List: React.FC<ListProps> = (props) => {
    return (
        <div>
            <TableList>
                <div>
                    {props.fio}
                </div>

                <div>
                    {props.direction}
                </div>
                <div>
                    {props.email}
                </div>
                <Last>
                    <EditDelete>
                        <img src={edit} alt="edit"/>
                        <img src={del} alt="delete"/>
                    </EditDelete>
                </Last>
            </TableList>
        </div>
    )
}