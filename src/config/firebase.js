import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyCsHmC_CXB4K98V3qCf7-Xvj5319wcagAc",
    authDomain: "crisol-ia.firebaseapp.com",
    databaseURL: "https://crisol-ia.firebaseio.com",
    projectId: "crisol-ia",
    storageBucket: "crisol-ia.appspot.com",
    messagingSenderId: "929053391456",
    appId: "1:929053391456:web:a5bf7639e9c0b4c072a105"
  };

firebase.initializeApp(firebaseConfig);

function addFirestore(){
    firebase.firestore().collection("users").add({nombre: "noe"})
}

export default firebase