import React from 'react';
import logo from './logo.svg';
import './App.css';

import firebase from "./config/firebase"

function addFirestore() {
  // let add = firebase.firestore().collection("users").add({ nombre: "noe" })
  console.log("Añadido")
}



function App() {
  addFirestore()
  return (
    <div className="App">
      <form>
        <label>
          Name:
         <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
