import * as firebase from "firebase";

importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-messaging.js');

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
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload){
    alert('dsfsdf')
    console.log(payload)
    const title = "New message"
    const options = {
        body: 'hello'
    }
    return self.registration.showNotification(title, options)
})