import React, {useEffect} from 'react'
import css from './about-us.module.css'
import {useDispatch} from "react-redux";
import {setHeader} from "../../state/appReducer";
import edit from "../../img/edit.png";
import del from "../../img/delete.png";
import {EditDelete, GreenBtn} from "../mainStyledComponents/MainStyledComponents";

const AboutUs = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setHeader("О нас"))
    }, [dispatch])
    return (
        <div>
            <div className={css.infoWrapper}>
                <div>
                    <p>
                        PrimeDoc - это сервис для удалённых онлайн-консультаций с опытными врачами. Вы можете выбрать
                        нужного врача и проконсультироваться с ним через телефон, планшет или ноутбук. При этом, ваше
                        расположение не имеет значения.
                    </p>
                    <span className={css.editWrapper}>
                        <EditDelete>
                            <img src={edit} alt="edit"/>
                            <img src={del} alt="delete"/>
                        </EditDelete>
                    </span>
                </div>
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
            <div className={css.save}>
                <GreenBtn>Сохранить</GreenBtn>
            </div>
        </div>
    )
}

export default AboutUs