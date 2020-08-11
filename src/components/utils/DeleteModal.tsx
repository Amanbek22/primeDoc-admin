import {FormModalWrapper, Title} from "../admin/AdminComponents";
import css from "../admin/admin.module.css";
import {GreenBtn, ModalBtnWrapper} from "../mainStyledComponents/MainStyledComponents";
import React from "react";


const DeleteModal = (props: any) => {
    const del = () => {
        props.del()
        props.onModal()
    }
    return (
        <FormModalWrapper>
            <Title style={{
                textAlign: "center",
                marginTop: "120px"
            }}>
                {props.text} "{props.title}"?
            </Title>
            <ModalBtnWrapper>
                <GreenBtn className={css.btns} onClick={del}>Да</GreenBtn>
                <GreenBtn className={css.btns + ' ' + css.red} onClick={props.onModal}>Нет</GreenBtn>
            </ModalBtnWrapper>
        </FormModalWrapper>
    )
}

export default DeleteModal