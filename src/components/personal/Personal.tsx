import React, {useEffect} from 'react'
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


const Personal = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setHeader("Персонал"))
    }, [dispatch])
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
                <List fio={'Adsnfasgn ADomdlm'} direction={'terapevt'} email={'asknkg@mail.ru'}/>
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