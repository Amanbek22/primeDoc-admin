import React, {useEffect, useState} from 'react'
import {auth, db} from "../../firebase";
import {firestore} from 'firebase'
import ChatUI from "./Chat";
const FirebaseChat = (props) => {
    const [user, setUser] = useState()
    const [users, setUsers] = useState([])
    const [chat, setChat] = useState()
    const dataBase = firestore()
    useEffect(()=> {
        setUser(auth().currentUser)
        const a = dataBase?.collection('chatAdmin')
            .onSnapshot((querySnapshot)=>{
                let arr = []
                querySnapshot.forEach((doc) => {
                    arr.push(doc.data())
                })
                setUsers([...arr])
                console.log(arr)
            })
    },[])
    return (
        <ChatUI
            onSubmit={()=>{}}
            users={users}
            messages={[]}
            onUserChoose={()=>{}}
            user={user}
        />
    )
}


export default FirebaseChat