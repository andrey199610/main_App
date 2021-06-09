import app from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBSg4zIs9xeFpyEHjT-A3EzXtI1EiOXvEc",
  authDomain: "crud-a4ccf.firebaseapp.com",
  projectId: "crud-a4ccf",
  storageBucket: "crud-a4ccf.appspot.com",
  messagingSenderId: "93575875319",
  appId: "1:93575875319:web:eac7b5de6058967c9721f2",
};

const firebase = app.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const auth = firebase.auth();

export { firebase, firestore, app, auth };
