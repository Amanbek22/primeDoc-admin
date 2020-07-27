import React, {useEffect} from 'react'
import {useDispatch} from "react-redux";
import {setHeader} from "../../state/appReducer";
import css from './chat.module.css'
import video from '../../img/video.png'
import send from '../../img/send.png'


const Chat = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setHeader("Чат"))
    }, [dispatch])
    useEffect(() => {
        document.getElementsByTagName('body')[0].classList.add(css.bodyBg)
        return () => document.getElementsByTagName('body')[0].classList.remove(css.bodyBg)
    }, [])
    return (
        <div className={css.wrapper}>
            <div className={css.userList}>
                <div className={css.searchWrapper}>
                    <input className={css.search} type="text" placeholder={'Найти сотрудника'}/>
                </div>
                <div className={css.users}>
                    <User/>
                    <User/>
                    <User/>
                    <User/>
                    <User/>
                    <User/>
                    <User/>
                    <User/>
                    <User/>
                    <User/>
                    <User/>
                    <User/>
                    <User/>
                    <User/>
                    <User/>
                    <User/>
                    <User/>
                    <User/>
                    <div className={css.all}>
                        <span>Загрузить все</span>
                    </div>
                </div>
            </div>
            <MessageBlock/>
        </div>
    )
}


const User = () => {
    return (
        <div className={css.user
            // css.activeUser
        }>
            <div className={css.avaWrapper}>
                <img src="https://data.whicdn.com/images/332611241/original.jpg" alt="logo"/>
            </div>
            <div>
                <div className={css.name}>Асанова Алия</div>
                <div className={css.lastMessage}>Здравствуйте!</div>
            </div>
            <div className={css.count}>
                1
            </div>
        </div>
    )
}

const MessageBlock = () => {
    return (
        <div className={css.chat}>
            <div className={css.chat__header}>
                <div className={css.header__name}>Асанова Алия</div>
                <div>
                    <img src={video} alt="video"/>
                </div>
            </div>
            <div className={css.messages}>
                <Message/>
                <MyMessage/>
                <Message/>
                <MyMessage/>
                <Message/>
                <MyMessage/>
                <Message/>
                <MyMessage/>
                <Message/>
                <MyMessage/>
                <Message/>
                <MyMessage/>

            </div>
            <div className={css.input__wrapper}>
                <input type="text" className={css.search} placeholder={'Введите сообщение...'}/>
                <button type="submit" className={css.send}>
                    <img src={send} alt="send"/>
                </button>
            </div>
        </div>
    )
}

const MyMessage = () => {
    return (
        <div>
            <span className={css.my__message}>
                Hello!!!
                Hello!!!
                Hello!!!
                Hello!!!
                Hello!!!
                Hello!!!
                Hello!!!
            </span>
        </div>
    )
}

const Message = () => {
    return (
        <div className={css.message__wrapper}>
            <div>
                <div className={css.message_ava}>
                    <img src="https://data.whicdn.com/images/332611241/original.jpg" alt="logo"/>
                </div>
                <div className={css.message__name}>
                    Асанова Алия
                </div>
            </div>
            <div>
                <span/>
                <div>
                            <span className={css.message}>
                                Здравствуйте!
                                Здравствуйте!
                            </span>
                </div>
            </div>
        </div>
    )
}

export default Chat