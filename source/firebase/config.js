import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyARYRBOSxK6w8wUC1052mZq8_oQ9LaU5sI",
    authDomain: "salvador-a6121.firebaseapp.com",
    projectId: "salvador-a6121",
    storageBucket: "salvador-a6121.appspot.com",
    messagingSenderId: "164083674841",
    appId: "1:164083674841:web:be38e960f782145335d8c8",
    measurementId: "G-SMHKB67HLV"
  };
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

class FirebaseConfig {
    auth = firebase.auth();
    firestore = firebase.firestore();
}

export { FirebaseConfig };