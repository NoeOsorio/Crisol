import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons'
import firebase from "./config/firebase"

// import TextField from '@material-ui/core/TextField';
import TextField from "./textField"
import Output from "./output"


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      last : 0,
      temperature: 0,
      gas: 0,
      fan: 0,
      goal: 270,
      // Aumenta 10%
      porcentaje: 10
    };
    this.handlePlay = this.handlePlay.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }

  // addFirestore() {
  //   let add = firebase.firestore().collection("users").add({ nombre: "noe" })
  //   console.log("Añadido")
  // }

  handlePlay() {
    console.log('Play!');
    this.warm(this.state.temperature)
    // console.log(`Temperatura del Crisol: ${this.state.temperature}`);
    // console.log(`Ventilador: ${this.state.fan}`);
    // console.log(`Gas: ${this.state.gas}`);
  }

  handleStop() {
    console.log('Stop!');
  }

  getTemperature(temperatura_anterior, gas, ventilador) {
    // Temporal
    return (temperatura_anterior) + (2 * gas) - 2 - (ventilador * 3)

  }

  getGrow(last, max){
    // max es el maximo porcentaje que puede crecer dado el cambio de temperatura con relacion al gas
    let grow = (this.state.goal - last -1) * 100
    if(grow > max){
      grow = max
    }
    console.log(`Va a crecer ${grow}%`)
    return grow
  }

  getGas(grow)  {
    return 10
  }

  getFanCounter(grow) {
    return false;
  }

  warm() {
    // Porcentaje
    // let porcentaje = this.state.porcentaje
    let last = this.state.temperature
    let porcentaje = parseInt(this.getGrow(last, 100))

    let gas = parseInt(this.getGas(porcentaje))
    console.log(gas)
    let fan = this.getFanCounter(porcentaje)
    console.log(fan)
    let temp = parseInt(this.getTemperature(last, gas, fan))
    let grow = parseInt((temp / last - 1) * 100)
    console.log(temp)
    console.log("En realidad crecio: " + grow + "%")
    this.setState({
      last : last,
      gas: gas,
      fan: fan,
      temperature: temp,
      porcentaje : porcentaje
    })



    this.addFirestore({
      last: last,
      gas: gas,
      fan: fan,
      temperature: temp,
      grow: grow
    })
    this.getHistory()
  }

  addFirestore(object) {
    firebase.firestore().collection('history').add(object)
  }

  getHistory(){
    firebase.firestore().collection('history').get().then(snapshot =>{
        let mediaGas
        snapshot.docs.forEach(doc =>{
          console.log(doc.data())
        })
    })
  }





  render() {

    return (
      <div className="App">
        <div className="results">
          <img className="logo" src="http://pre03.deviantart.net/affb/th/pre/i/2012/059/8/9/fire_vector_by_lekadema-d4r921b.png" />
          <h2>Resultados </h2>
          <form>
            <TextField
              label="Temperatura"
              variant="outlined"
              id="temp"
              value={this.state.temperature}
              onChange={e => this.setState({ temperature: parseInt(e.target.value ? e.target.value : 0) })}
            />

            <div>
            </div>
            <div className="buttonRow">
              <div>
                <FontAwesomeIcon className="playButton" icon={faPlay} onClick={this.handlePlay} />
                Play
              </div>

              <div>
                <FontAwesomeIcon className="stopButton" icon={faStop} onClick={this.handleStop} />
                Stop
              </div>

            </div>
          </form>
          <div className="output">
            <Output
              temp={this.state.temperature}
              gas={this.state.gas}
              fan={this.state.fan}
              grow={this.state.porcentaje}
            />

          </div>
        </div>
      </div >
    );
  }
}

export default App;
