import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:process.env.REACT_APP_APIKEY,
  authDomain:process.env.REACT_APP_DOMAIN ,
  projectId: process.env.REACT_APP_ID,
  storageBucket:process.env.REACT_APP_BUCUET,
  messagingSenderId:process.env.REACT_APP_SENDERID,
  appId:process.env.REACT_APP_AAPPID,
  measurementId: process.env.REACT_APP_MEASUREMNTID
};
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = app.firestore();
export { db, auth };
