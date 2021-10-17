import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA1-684rcmnaiE7fLa0OYGLFCl2XQyzeqU",
    authDomain: "nextfire-app-eli.firebaseapp.com",
    projectId: "nextfire-app-eli",
    storageBucket: "nextfire-app-eli.appspot.com",
    messagingSenderId: "16942115820",
    appId: "1:16942115820:web:cb9b8876ec22cd20faeec9",
    measurementId: "G-RMP249SLK6"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
