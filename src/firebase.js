// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCecmlHTKOmBrlT9jjvP_2V3gxE7FI72EM",
  authDomain: "crudlibros-a6d4d.firebaseapp.com",
  projectId: "crudlibros-a6d4d",
  storageBucket: "crudlibros-a6d4d.appspot.com",
  messagingSenderId: "1026722629428",
  appId: "1:1026722629428:web:b9f27e6e5c753953d70761"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};