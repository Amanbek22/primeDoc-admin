import React, {useEffect} from 'react'
import {useDispatch} from "react-redux";
import {setHeader} from "../../state/appReducer";


const Chat = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(setHeader("Чат"))
    }, [dispatch])
    return (
        <div>
            Chat
        </div>
    )
}


export default Chat