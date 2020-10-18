import React, {useEffect, useRef, useState} from 'react'
import {useDispatch} from "react-redux";
import {setHeader} from "../../state/appReducer";
import css from './chat.module.css'
import plus from '../../img/Mask.png'
import send from '../../img/send.png'
import ModalWrapper from "../modal/Modal";
import {GreenBtn, GreenDiv} from "../mainStyledComponents/MainStyledComponents";

type ChatProps = {
    users: [any]
    messages: any
    onUserChoose: any
    onSubmit: (text: string) => void
    user: any
    active: boolean | string | null
    admin: any
    searchName: string
    setSearchName: (str:string) => void
}
const Chat: React.FC<ChatProps> = (props) => {
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
                {/*<div className={css.searchWrapper}>*/}
                {/*    <input onChange={(e) => props.setSearchName(e.target.value)} className={css.search} value={props.searchName} type="text" placeholder={'Найти пациента'}/>*/}
                {/*</div>*/}
                <div className={css.users}>
                    {
                        props.users.map((item: any, index) => <User active={props.active} key={item.clientId}
                                                                    sid={item.sid}
                                                                    data={item} index={index}
                                                                    onC={props.onUserChoose}/>)
                    }
                    <div className={css.all}>
                        {/*<span>Загрузить все</span>*/}
                    </div>
                </div>
            </div>
            <MessageBlock user={props.user} messages={props.messages} admin={props.admin} onSubmit={props.onSubmit}/>
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
    return (
        <div className={props.active !== props.data?.clientId ? css.user : css.user + ' ' + css.activeUser}
             onClick={() => props.onC(props.data?.clientId)}
        >
            <div className={css.avaWrapper}>
                <img src="https://mediator.kg/wp-content/themes/twentynineteen/images/avatar-no-photo.png" alt="logo"/>
            </div>
            <div className={css.nameWrapper}>
                <div className={css.name}>{props.data?.name + ' ' + props.data?.surname}</div>
                <div className={css.lastMessage}>
                    {props.data?.lastMessage}
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
    onSubmit: (text: any) => void
    user: any
    admin: any
}
const MessageBlock: React.FC<MessageProps> = (props) => {
    const messageId: any = useRef(null)
    const scrollToBottom = () => {
        const scrollHeight = messageId?.current?.scrollHeight;
        const height = messageId?.current?.clientHeight;
        if (messageId.current) messageId.current.scrollTop = scrollHeight - height
    }

    const handleSubmit = async (text: any) => {
        // event.preventDefault();
        // this.setState({ writeError: null });
        props.onSubmit(text)
    }
    useEffect(() => {
        scrollToBottom()
    })
    return (
        <div className={css.chat}>
            {
                props.user
                    ? <>
                        <div className={css.chat__header}>
                            <div className={css.header__name}>{props.user?.userPhone}</div>
                            <div>
                                {/*<img src={video} alt="video"/>*/}
                            </div>
                        </div>
                        <div ref={messageId} className={css.messages}>
                            {
                                props.messages.map((item: any) => {
                                    if (item.sender === props.admin.uid) {
                                        return <MyMessage
                                            text={item.message}
                                            type={item.type}
                                            user={props.user}
                                            media={item?.image}
                                            key={item.time.seconds}/>
                                    } else {
                                    return <Message key={item.time.seconds} user={props.user} type={item.type}
                                                    media={item.image}
                                                    text={item.message}/>
                                    }
                                })
                            }
                            {/*<Message/>*/}
                            {/*<MyMessage/>*/}
                        </div>
                        <SendForm onSubmit={handleSubmit}/>
                    </>
                    : <div className={css.noChat}>Выберите чат для переписки</div>
            }
        </div>
    )
}
const SendForm = (props: any) => {
    const [inp, setInp] = useState('')
    const [img, setImg] = useState<any>(null)
    const [image, setImage] = useState('')
    const [model, setModel] = useState(false)

    const onModal = () => setModel(!model)
    const onModalAway = () => {
        imgChange(null)
    }
    const submit = (e: any) => {
        e.preventDefault()
        if (!img) {
            props.onSubmit(inp)
        } else {
            props.onSubmit(img[0])
        }
        setInp('')
        setImg(null)
    }
    const imgChange = (e: any) => {
        // setModel(!model)

        setImg(e ? e?.target?.files : null)
    }
    return (
        <form onSubmit={submit} className={css.input__wrapper}>
            <label>
                <input accept={'Image/*'} style={{display: 'none'}} type="file" onChange={(e: any) => {
                    const reader = new FileReader();
                    if (e?.target?.files.length) {
                        reader.readAsDataURL(e.target.files[0])
                    } else {
                        setImg('')
                    }
                    reader.onload = (e: any) => {
                        const newUrl = e.target.result.split(',')
                        setImage(newUrl[1])
                    }
                    imgChange(e)
                }}/>
                <span className={css.plus}>
                    <img src={plus} alt="+"/>
                </span>
            </label>
            <input value={inp} onChange={(e) => {
                setInp(e.target.value)
            }} type="text" className={css.search}
                   placeholder={'Введите сообщение...'}/>
            <button type="submit" className={css.send}>
                <img src={send} alt="send"/>
            </button>
            <ModalWrapper
                onModal={onModal}
                visible={!!img}
                width={"450"}
                height={"450"}
                onClickAway={onModalAway}
            >
                <div className={css.imgWrapper}>
                    <img src={"data:image/jpg;base64," + image} alt="#"/>
                </div>
                <div className={css.btnsWrapper}>
                    <GreenDiv onClick={onModalAway} background={'red'}>
                        Отменить
                    </GreenDiv>
                    <GreenBtn>
                        Отправить
                    </GreenBtn>
                </div>
            </ModalWrapper>
        </form>
    )
}


type MyMessageProps = {
    text: any
    media: string
    user?: any
    type: string
}
const MyMessage: React.FC<MyMessageProps> = ({text, ...props}) => {
    return (
        <div>
            <span className={css.my__message}>
                {
                    props.media ? <> <img className={css.messageImg} src={props.media} alt="#"/> <br/> </> : null
                }
                <span>
                {text}
                </span>
            </span>
        </div>
    )
}

const Message: React.FC<MyMessageProps> = (props) => {
    return (
        <div className={css.message__wrapper}>
            <div>
                <div className={css.message_ava}>
                    <img src={props.user?.image ? props.user?.image : "https://mediator.kg/wp-content/themes/twentynineteen/images/avatar-no-photo.png"} alt="logo"/>
                </div>
                <div className={css.message__name}>
                    {/*{props.user?.userPhone}*/}
                </div>
            </div>
            <div>
                <span/>
                <div>
                    <span className={css.message}>
                        {
                            props.media ? <><img className={css.messageImg} src={props.media} alt="#"/> <br/> </> : null
                        }
                            {props.text}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Chat