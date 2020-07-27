import React, {useEffect, useState} from 'react'
import css from './about-us.module.css'
import {useDispatch} from "react-redux";
import {setHeader} from "../../state/appReducer";
import edit from "../../img/edit.png";
import del from "../../img/delete.png";
import {EditDelete, GreenBtn, Input, TextArea} from "../mainStyledComponents/MainStyledComponents";
import api from '../../api/Api'
import EditDeleteComponent from "../utils/EditDelete";
import {useFormik} from "formik";
import Select from "react-select";
import ModalWrapper from "../modal/Modal";

const AboutUs = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setHeader("О нас"))
    }, [dispatch])
    const [data, setData] = useState<any>([])
    useEffect(()=>{
        api.getAboutUs()
            .then((res)=>{
                console.log(res)
                setData(res.data)
            })

    },[])
    return (
        <div>
            <div className={css.infoWrapper}>
                {
                    data.map((item:any) => <Part
                        key={item.id}
                        id={item.id}
                        order={item.order}
                        header={item.header}
                        paragraph={item.paragraph} />)
                }
                <div className={css.contact}>Контакты</div>
                <div>
                    <div className={css.header}>Адрес в Бишкеке:</div>
                    <span>г.Бишкек ул.Сыдыкова 113, пер. ул.Тоголок-Молдо</span>
                </div>
                <div>
                    <div className={css.header}>Контактные данные:</div>
                    <div>
                    <span>+996 501 116 622</span><br/>
                    <span>+996 551 152 200</span>
                    </div>
                    <span className={css.editWrapper}>
                        <EditDelete>
                            <img src={edit} alt="edit"/>
                            <img src={del} alt="delete"/>
                        </EditDelete>
                    </span>
                </div>
                <div className={css.btnWrapper}>
                    <GreenBtn>Добавить фото</GreenBtn>
                    <GreenBtn className={css.blue}>Загрузить с...</GreenBtn>
                </div>
            </div>
            {/*<div className={css.save}>*/}
            {/*    <GreenBtn>Сохранить</GreenBtn>*/}
            {/*</div>*/}
        </div>
    )
}

type PartProps = {
    paragraph: string
    header: string
    id: number
    order: number
}
const Part = (props:PartProps) => {
    const [edit, setEdit] = useState(false)
    const onEdit = () => setEdit(!edit)
    const formik = useFormik({
        initialValues: {
            paragraph: props.paragraph,
            header: props.header
        },
        // validate,
        onSubmit: (values) => {
            api.setAboutUs(props.id,{
                header: values.header,
                id: props.id,
                order: props.order,
                paragraph: values.paragraph
            }).then((res)=>console.log(res))
            onEdit()
        },
    });
    return (
        <div className={css.partWrapper}>
            <div className={css.contact}>{formik.values.header}</div>
            <p>
                {formik.values.paragraph}
            </p>
            <span className={css.editWrapper}>
                <EditDeleteComponent editing={edit} onEdit={onEdit} onModal={()=>{}} onDone={()=>{}} noDel={true} />
            </span>
            <ModalWrapper onModal={onEdit} visible={edit} width={"450"} height={"400"}
                          onClickAway={onEdit}>
                <form onSubmit={formik.handleSubmit} className={css.editModalWrapper}>
                    <Input name={'header'} onChange={formik.handleChange} type="text" value={formik.values.header}/>
                    <TextArea className={css.textArea} name={'paragraph'} onChange={formik.handleChange}  value={formik.values.paragraph}/>
                    <GreenBtn>Сохранить</GreenBtn>
                </form>
            </ModalWrapper>
        </div>
    )
}

export default AboutUs