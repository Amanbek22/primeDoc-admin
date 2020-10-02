import firebase from "firebase";

const config = {
    apiKey: "AIzaSyCTU8gDsFCaeB4kCX8wtFA2O8a1U4X6PfU",
    authDomain: "primedoc-94c30.firebaseapp.com",
    databaseURL: "https://primedoc-94c30.firebaseio.com",
    projectId: "primedoc-94c30",
    storageBucket: "primedoc-94c30.appspot.com",
    messagingSenderId: "306116052518",
    appId: "1:306116052518:web:41f1882e08532180e588e7",
    measurementId: "G-ZMH1W3JMQH"
};
firebase.initializeApp(config)
// const messaging = firebase.messaging()

// function InitializeFireBaseMessaging() {
//     messaging.requestPermission()
//         .then(function () {
//             console.log("Notification permission")
//             return messaging.getToken()
//         })
//         .then(function (token){
//             console.log(token)
//             firebase.firestore().collection('adminToken').doc('admin').set({
//                 token: token
//             })
//                 .then((res)=>{
//                     console.log(res)
//                 })
//         })
//         .catch(function (reason){
//             console.log(reason)
//         })
// }
// messaging.onMessage(function (payload){
//     alert('sdgsd')
//     console.log(payload)
//     document.title = 'Новое сообщение'
// })
//
// messaging.onTokenRefresh(function (){
//     messaging.getToken()
//         .then(function (newToken){
//             console.log('New Token',newToken)
//         })
//         .catch(function (reason){
//             console.log(reason)
//         })
// })

// InitializeFireBaseMessaging()

export const auth = firebase.auth;
export const db = firebase.database();


export function signInFirebase(email, password) {
    return auth().signInWithEmailAndPassword(email, password);
}