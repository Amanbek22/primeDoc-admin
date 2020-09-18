import React, {useEffect, useState} from 'react'
import {auth, db} from "../../firebase";
import {firestore} from 'firebase'
import ChatUI from "./Chat";

const FirebaseChat = (props) => {
    const [user, setUser] = useState()
    const [users, setUsers] = useState([])
    const [activeUser, setActiveUser] = useState(null)
    const [uid, setUid] = useState('')
    const [chat, setChat] = useState()
    const [userData, setUserData] = useState(null)
    const [messages, setMessages] = useState([])
    const dataBase = firestore()
    const messagesRef = db.ref('chatAdmin')
        .orderByKey()
        .limitToLast(100);

    useEffect(() => {
        setUser(auth().currentUser)
        setUid(auth().currentUser)
        const db = dataBase?.collection('chatAdmin')
            .onSnapshot((querySnapshot) => {
                let arr = []
                querySnapshot.forEach((doc) => {
                    arr.push(doc.data())
                })
                setUsers([...arr])
            })
    }, [])
    useEffect(() => {
        const User = activeUser ? dataBase?.collection('users')
            .doc(activeUser)
            .onSnapshot((res)=>{
                let data = res.data()
                setUserData(data)
        }) : null

        const messages = activeUser ? dataBase?.collection('chatAdmin')
            .doc(activeUser).collection('messages')
            .onSnapshot((querySnapshot) => {
                let arr = []
                querySnapshot.forEach((doc) => {
                    arr.push(doc.data())
                })
                setMessages([...arr])
            }) : null
    }, [activeUser])

    const onSubmit = async (e) => {
        alert(e)
        try {
            await dataBase?.collection("chatAdmin").doc(activeUser).collection('messages').add({
                message: e,
                image: '',
                type: 'text',
                receiver: '',
                time: new Date(),
                sender: user.uid
            });
            // this.setState({ content: '' });
        } catch (error) {
            alert('some error with sending message')
            console.log(error.message)
        }
    }
    return (
        <ChatUI
            onSubmit={onSubmit}
            admin={user}
            users={users}
            messages={messages}
            onUserChoose={(e) => setActiveUser(e)}
            user={userData}
            active={activeUser}
        />
    )
}


export default FirebaseChat