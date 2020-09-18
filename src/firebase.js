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
export const auth = firebase.auth;
export const db = firebase.database();


export function signInFirebase(email, password) {
    return auth().signInWithEmailAndPassword(email, password);
}