import firebase from "firebase"
import { template } from "@babel/core";

//Emergency
// const firebaseConfig = {
//   apiKey: "AIzaSyAjvdWl8hspSG86iU8q0LFM-33P7isMwtw",
//   authDomain: "crisol-emergency.firebaseapp.com",
//   databaseURL: "https://crisol-emergency.firebaseio.com",
//   projectId: "crisol-emergency",
//   storageBucket: "",
//   messagingSenderId: "296545743296",
//   appId: "1:296545743296:web:291cd4c0068ef1e9711825"
// };

//Emergency-2
const firebaseConfig = {
  apiKey: "AIzaSyBfqY3APccrafF8bWhqsNTUtt8s9OrA-Uo",
  authDomain: "crisol-emergency-2.firebaseapp.com",
  databaseURL: "https://crisol-emergency-2.firebaseio.com",
  projectId: "crisol-emergency-2",
  storageBucket: "crisol-emergency-2.appspot.com",
  messagingSenderId: "90199020127",
  appId: "1:90199020127:web:a5156b9c023827fd9681ea"
};

//Crisol
// const firebaseConfig = {
//   apiKey: "AIzaSyCsHmC_CXB4K98V3qCf7-Xvj5319wcagAc",
//   authDomain: "crisol-ia.firebaseapp.com",
//   databaseURL: "https://crisol-ia.firebaseio.com",
//   projectId: "crisol-ia",
//   storageBucket: "crisol-ia.appspot.com",
//   messagingSenderId: "929053391456",
//   appId: "1:929053391456:web:a5bf7639e9c0b4c072a105"
// };

firebase.initializeApp(firebaseConfig);




export default firebase


// class firebaseService{
    
//     function addFirestore(object){
//         firebase.firestore().collection(new Date().toISOString).add(object)
//     }
// }