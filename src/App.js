import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons'
import firebase from "./config/firebase"

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      temperature: 0,
      gas: 0,
      fan: 0,
      porcentaje: 0
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
    console.log(`Temperatura del Crisol: ${this.state.temperature}`);
    console.log(`Ventilador: ${this.state.fan}`);
    console.log(`Gas: ${this.state.gas}`);
  }

  handleStop() {
    console.log('Stop!');
  }

  getTemperature(temperatura_anterior, gas, ventilador) {

    // return (temperatura_anterior) + (2 * gas) - 2 - (ventilador * 3)

  }

  getGas(temperatura_anterior, porcentaje) {
    // let gas = 0
    // let temp = temperatura_anterior + temperatura_anterior * porcentaje/100
    // if (porcentaje >= 0) {
    //   gas = (temp - temperatura_anterior + 2) / 2
    // }
  
    // return gas > 100 ? 100 : gas
    // Por ejemplo para subir un 25% la temperatura
    // si temperatura_anterior = 100 entonces temperatura = 125
    // 125 = 100 + 2*gas - ventilador*3 - 2
    // Si queremos aumentar, osea porcentaje > 0
    // Entonces ventilador = 0
    // 125 = 100 + 2*gas - 2
    // 125 + 2 = 100 + 2*gas
    // 127 = 100 + 2*gas
    // 27 = 2*gas
    // 13.5 = gas

  }

  getFanCounter(temperatura_anterior, porcentaje){
    // return (temperatura_anterior * (porcentaje * -1)/100) >= 3
  }

  warm(lastTemperature) {
    // Porcentaje
    let porcentaje = this.state.porcentaje

    let gas = this.getGas(lastTemperature, porcentaje) 
    console.log(gas)
    let fan = this.getFanCounter(porcentaje)
    console.log(fan)

    let temp = this.getTemperature(lastTemperature, gas, fan)
    console.log(temp)
    this.setState({
      gas : gas,
      fan : fan,
      temperature: temp
    })



    this.addFirestore({
      lastTemperature: lastTemperature,
      gas: gas,
      fan: fan,
      temperature: temp,
      porcentaje: porcentaje
    })
  }

  addFirestore(object) {
    firebase.firestore().collection('test').add(object)
  }


  render() {
    return (
      <div className="App">
        <div className="results">
          <img className="logo" src="http://pre03.deviantart.net/affb/th/pre/i/2012/059/8/9/fire_vector_by_lekadema-d4r921b.png" />
          <h2>Resultados </h2>
          <form>
            <table>
              <tbody>
                <tr>
                  <th>
                    <label>
                      Temperatura:
                  </label>
                  </th>
                  <th>
                    <input type="text" name="name" value={this.state.temperature} onChange={e => this.setState({ temperature: parseInt(e.target.value ? e.target.value : 0) })} />
                  </th>
                </tr>

                <tr>
                  <th>
                    <label>
                      Porcentaje:
                  </label>
                  </th>
                  <th>
                    <input type="text" name="name" value={this.state.porcentaje} onChange={e => this.setState({ porcentaje: parseInt(e.target.value ? e.target.value : 0) })} />
                  </th>
                </tr>

                {/* <tr>
                  <th>
                    <label>
                      Ventilador:
                  </label>
                  </th>
                  <th>
                    <input type="text" name="name" onChange={e => this.setState({ fan: parseInt(e.target.value) })} />
                  </th>
                </tr> */}
                {/* <tr>
                  <th>
                    <label>
                      Gas:
                  </label>
                  </th>
                  <th>
                    <input type="text" name="name" onChange={e => this.setState({ gas: parseInt(e.target.value) })} />
                  </th>
                </tr> */}
              </tbody>
            </table>
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
        </div>
      </div >
    );
  }
}

export default App;
