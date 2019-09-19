import firebase from "firebase"
import { template } from "@babel/core";

const firebaseConfig = {
  apiKey: "AIzaSyAjvdWl8hspSG86iU8q0LFM-33P7isMwtw",
  authDomain: "crisol-emergency.firebaseapp.com",
  databaseURL: "https://crisol-emergency.firebaseio.com",
  projectId: "crisol-emergency",
  storageBucket: "",
  messagingSenderId: "296545743296",
  appId: "1:296545743296:web:291cd4c0068ef1e9711825"
};

firebase.initializeApp(firebaseConfig);




export default firebase


// class firebaseService{
    
//     function addFirestore(object){
//         firebase.firestore().collection(new Date().toISOString).add(object)
//     }
// }