import firebase from "firebase"

function addFirestore(){
    firebase.firestore().collection("users").add({nombre: "noe"})
}