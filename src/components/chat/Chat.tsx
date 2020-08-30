import React, {useEffect, useState} from 'react'
import {useDispatch} from "react-redux";
import {setHeader} from "../../state/appReducer";
import css from './chat.module.css'
import video from '../../img/video.png'
import send from '../../img/send.png'

type ChatProps = {
    users: [any]
    messages: any
    onUserChoose: any
    onSubmit: (text: string) => void
    user: any
}
const Chat: React.FC<ChatProps> = (props) => {
    // console.log(props)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setHeader("Чат"))
    }, [dispatch])
    const [name, setName] = useState('')
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
                    {
                        props.users.map((item: any, index) => <User active={props.user} key={item.sid} sid={item.sid} data={item} index={index}
                                             onC={props.onUserChoose}/>)
                    }
                    <div className={css.all}>
                        <span>Загрузить все</span>
                    </div>
                </div>
            </div>
            <MessageBlock user={props.user} messages={props.messages} onSubmit={props.onSubmit}/>
        </div>
    )
}

type UserProps = {
    onC: any
    sid: string
    index: number
    data: any
    active: any
}
const User: React.FC<UserProps> = (props) => {
    const [name, setName] = useState('')
    // console.log(props.active?.id === props.sid)
    props.data.getMembers().then((member:any) => {
        member.map(async (u: any) => {
            let user = await u.getUser()
            if (user.identity !== '1:[ADMIN]') {
                // console.log(user.friendlyName)
                setName(user.friendlyName)
            }
        })
    })
    return (
        <div className={ props.active?.id !== props.sid ? css.user : css.user + ' ' + css.activeUser
        }
             onClick={() => props.onC(props.sid, props.index)}
        >
            <div className={css.avaWrapper}>
                <img src="https://mediator.kg/wp-content/themes/twentynineteen/images/avatar-no-photo.png" alt="logo"/>
            </div>
            <div>
                <div className={css.name}>{name}</div>
                <div className={css.lastMessage}>
                    {/*Здравствуйте!*/}
                </div>
            </div>
            {/*<div className={css.count}>*/}
            {/*    1*/}
            {/*</div>*/}
        </div>
    )
}

type MessageProps = {
    messages: any
    onSubmit: (text: string) => void
    user: any
}
const MessageBlock: React.FC<MessageProps> = (props) => {
    const [inp, setInp] = useState('')
    const [img, setImg] = useState<any>(null)
    console.log(props.messages)
    const submit = (e: any) => {
        e.preventDefault()
        if(!img){
            props.onSubmit(inp)
        }else{
            props.onSubmit(img[0])
        }
        setInp('')
    }
    return (
        <div className={css.chat}>
            {
                props.user
                    ? <>
                        <div className={css.chat__header}>
                            <div className={css.header__name}>{props.user?.name}</div>
                            <div>
                                {/*<img src={video} alt="video"/>*/}
                            </div>
                        </div>
                        <div className={css.messages}>
                            {
                                props.messages.map((item: any) => {
                                    console.log(item)
                                    if(item.author.id === '1:[ADMIN]') {
                                        return <MyMessage text={item} key={new Date().getTime()}/>
                                    }else{
                                        return  <Message key={new Date().getTime()} user={props.user} text={item.text} />
                                    }
                                })
                            }
                            {/*<Message/>*/}
                            {/*<MyMessage/>*/}
                        </div>
                        <form onSubmit={submit} className={css.input__wrapper}>
                            {/*<label>*/}
                            {/*    <input type="file" onChange={(e)=> {*/}
                            {/*        setImg(e?.target?.files)*/}
                            {/*    }}/>*/}
                            {/*</label>*/}
                            <input value={inp} onChange={(e) => setInp(e.target.value)} type="text" className={css.search}
                                   placeholder={'Введите сообщение...'}/>
                            <button type="submit" className={css.send}>
                                <img src={send} alt="send"/>
                            </button>
                        </form>
                    </>
                    : <div className={css.noChat}>Выберите чат для переписки</div>
            }
        </div>
    )
}


type MyMessageProps = {
    text: any
    user?: any
}
const MyMessage: React.FC<MyMessageProps> = ({text, ...props}) => {
    return (
        <div>
            {
                text?.media ? <img src={text.media?.getContentTemporaryUrl()} alt="#"/> : null
            }
            <span className={css.my__message}>{text?.text}</span>
        </div>
    )
}

const Message:React.FC<MyMessageProps> = (props) => {
    return (
        <div className={css.message__wrapper}>
            <div>
                <div className={css.message_ava}>
                    <img src="https://data.whicdn.com/images/332611241/original.jpg" alt="logo"/>
                </div>
                <div className={css.message__name}>
                    {props.user.name}
                </div>
            </div>
            <div>
                <span/>
                <div>
                            <span className={css.message}>
                                {props.text}
                            </span>
                </div>
            </div>
        </div>
    )
}

export default Chat