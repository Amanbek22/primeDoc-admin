import React from 'react'
import edit from "../../img/edit.png";
import del from "../../img/delete.png";
import {EditDelete} from "../mainStyledComponents/MainStyledComponents";

type Props = {
    editing: boolean
    onEdit: () => void
    onModal: () => void
    onDone: (e:any) => void
    noEdit?: boolean
    noDel?: boolean
}
const EditDeleteComponent: React.FC<Props> = (props) => {
    return (
        <EditDelete>
            {
                props.noEdit ? <span> </span>
                    : props.editing
                            ? <img onClick={props.onDone} src="https://image.flaticon.com/icons/svg/1632/1632596.svg"
                                   alt="done"/>
                            : <img onClick={props.onEdit} src={edit} alt="edit"/>

            }
            {
                props.noDel ? <span />
                    : <img onClick={props.onModal} src={del} alt="delete"/>
            }
        </EditDelete>
    )
}

export default EditDeleteComponent