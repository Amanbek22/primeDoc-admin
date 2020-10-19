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
const messaging = firebase.messaging()

function InitializeFireBaseMessaging() {
    messaging.requestPermission()
        .then(function () {
            return messaging.getToken()
        })
        .then(function (token){
            console.log(token)
            firebase.firestore().collection('adminToken').doc('admin').set({
                token: token
            })
                .then((res)=>{
                    console.log(res)
                })
        })
        .catch(function (reason){
            console.log(reason)
        })
}

function saveMessagingDeviceToken() {
    firebase.messaging().getToken().then(function(currentToken) {
        if (currentToken) {
            console.log('Got FCM device token:', currentToken);
            // Saving the Device Token to the datastore.
            // firebase.firestore().collection('adminToken').doc('admin')
            //     .set({token: currentToken});
        } else {
            // Need to request permissions to show notifications.
            requestNotificationsPermissions();
        }
    }).catch(function(error){
        console.error('Unable to get messaging token.', error);
    });
}

function requestNotificationsPermissions() {
    console.log('Requesting notifications permission...');
    firebase.messaging().requestPermission().then(function() {
        // Notification permission granted.
        saveMessagingDeviceToken();
    }).catch(function(error) {
        console.error('Unable to get permission to notify.', error);
    });
}

messaging.onMessage(function (payload){
    console.log(payload)
    if(payload.data["gcm.notification.receiver"] === 'a'){
        document.title = 'Новое сообщение'
        document.getElementById('sound').play()
        setTimeout(()=>{
            document.title = "Prime Doc"
        }, 2000)
    }
})


// messaging.onTokenRefresh(function (){
//     messaging.getToken()
//         .then(function (newToken){
//             console.log('New Token',newToken)
//         })
//         .catch(function (reason){
//             console.log(reason)
//         })
// })


export const auth = firebase.auth;
export const db = firebase.database();

saveMessagingDeviceToken()
// InitializeFireBaseMessaging()

export function signInFirebase(email, password) {
    return auth().signInWithEmailAndPassword(email, password);
}