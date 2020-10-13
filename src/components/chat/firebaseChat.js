import React, {useEffect, useState} from 'react'
import {auth, db} from "../../firebase";
import firebase, {firestore} from 'firebase'
import ChatUI from "./Chat";

const storage = firebase.storage()

const FirebaseChat = () => {
    const [user, setUser] = useState()
    const [users, setUsers] = useState([])
    const [activeUser, setActiveUser] = useState(null)
    const [uid, setUid] = useState('')
    const [userData, setUserData] = useState(null)
    const [messages, setMessages] = useState([])
    const [searchName, setSearchName] = useState('')
    const dataBase = firestore()


    useEffect(() => {
        setUser(auth().currentUser)
        setUid(auth().currentUser)
        const db = dataBase?.collection('chatAdmin')
            // .orderBy('name')
            // .where(`name`, "array-contains", searchName)
            .onSnapshot((querySnapshot) => {
                let arr = []
                querySnapshot.forEach((doc) => {
                    arr.push(doc.data())
                })
                setUsers([...arr])
            })
        // const messaging = firebase.messaging()
    }, [])
    // let listener = dataBase.collection('chatAdmin').doc('chatAdminId')
    // console.log(listener)
    useEffect(() => {
        // let arr2 = []
        const User = activeUser ? dataBase?.collection('users')
            .doc(activeUser)
            .onSnapshot((res) => {
                // setMessages([])
                let data = res.data()
                setUserData(data)
            }) : null

        const message = activeUser ? dataBase?.collection('chatAdmin')
            .doc(activeUser).collection('messages')
            .onSnapshot((querySnapshot) => {
                let arr = []
                querySnapshot.forEach((doc) => {
                    arr.push(doc.data())
                })
                arr.sort((a, b) => a.time.seconds - b.time.seconds)
                // console.log(arr2)
                // console.log(arr)
                // if(arr2.length && arr.length > arr2.length){
                //     alert('new Message')
                // }
                setMessages([...arr])
            }) : null
    }, [activeUser])
    const search = (str)=>{
        setSearchName(str)
        // firebase.database.child('chatAdmin')
        //     .orderByChild('name')
        //     .equalTo(searchName)
        //     .on('value', snapshot => {
        //         console.log(snapshot.val());
        //     })
    }

    const onSubmit = async (text) => {
        const data = {
            message: typeof text !== 'object' ? text : '',
            image: typeof text === 'object' ? text : '',
            type: typeof text === 'object' ? 'image' : 'text',
            receiver: activeUser,
            time: new Date(),
            sender: user.uid
        }
        if (typeof text === 'object') {
            const uploadTask = storage.ref(`images/${text.name}`).put(text)
            uploadTask.on("state_changed", (snapshot) => {

                },
                (error) => {

                },
                () => {
                    storage
                        .ref("images")
                        .child(text.name)
                        .getDownloadURL()
                        .then(async (url) => {
                            try {
                                await dataBase?.collection("chatAdmin")
                                    .doc(activeUser).collection('messages').add({
                                        ...data,
                                        image: url
                                    });
                                await dataBase?.collection("chatAdmin").doc(activeUser).update({
                                    lastMessageSenderId: "a",
                                    lastMessage: "картинка",
                                    lastMessageTime: new Date()
                                })
                            } catch (error) {
                                // alert('some error with sending message')
                                console.log(error.message)
                            }
                        })
                })
        } else{
            if(data.message){
                try {
                    await dataBase?.collection("chatAdmin")
                        .doc(activeUser).collection('messages').add(data)
                    await dataBase?.collection("chatAdmin").doc(activeUser).update({
                        lastMessageSenderId: "a",
                        lastMessage: data.message,
                        lastMessageTime: new Date()
                    })
                } catch (error) {
                    // alert('some error with sending message')
                    console.log(error.message)
                }
            }
        }
    }
    return (
        <ChatUI
            setSearchName={search}
            searchName={searchName}
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