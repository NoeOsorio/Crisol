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
      temperature: 0,
      gas: 0,
      fan: 0,
      goal: 270,
      // Aumenta 10%
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
    this.setState({
      interval: setInterval(() => this.warm(this.state.temperature), 1000)
    })

    // console.log(`Temperatura del Crisol: ${this.state.temperature}`);
    // console.log(`Ventilador: ${this.state.fan}`);
    // console.log(`Gas: ${this.state.gas}`);
  }

  handleStop() {
    console.log('Stop!');
    this.setState({
      temperature: 0,
      gas: 0,
      fan: 0,
      goal: 270,
      // Aumenta 10%
      porcentaje: 0
    })
    clearInterval(this.state.interval);
  }

  getTemperature(temperatura_anterior, gas, ventilador) {
    // Temporal
    return (temperatura_anterior) + (gas * gas) - 2 - (ventilador ? 3 : 0)
    // return (temperatura_anterior) + (gas * gas) - 2 - (ventilador ? 3 : 0)

  }

  getGrow(last) {
    let grow = (this.state.goal / last - 1) * 100
    console.log(`${this.state.goal} / ${last} - 1 = ${grow} %`)
    console.log(`Va a crecer ${grow}%`)
    return grow
  }

  getDiff(temp) {
    return this.state.goal - temp
  }

  getGas(grow) {
    // Random gas
    this.getGasDB(grow)
    return Math.floor(Math.random() * 100)
  }

  getFanCounter(grow) {
    return grow < 0;
  }

  async warm() {

    let last = this.state.temperature
    let needed = this.getDiff(last)
    let gas = await this.getGasDB(needed)
    let fan = this.getFanCounter(needed)

    let temp = parseInt(this.getTemperature(last, gas, fan))
    let grow = temp - last

    console.log(`Aumento ${grow} ºC con ${gas}% de gas`)
    this.setState({
      last: last,
      gas: gas,
      fan: fan,
      temperature: temp,
      porcentaje: grow
    })



    this.saveHistory({
      last: last,
      gas: gas,
      fan: fan,
      temperature: temp,
      grow: grow
    })
    // this.getHistory()
  }

  saveHistory(object) {
    firebase.firestore().collection('history').add(object)
  }

  async getGasDB(grow) {
    const error = 5

    if (grow < 0) {
      return 0
    }
    let exact = false
    // GAS
    let N = 1
    let gas
    let growPerGas = 1
    let low = 0, high = 100
    let snapshot = await firebase.firestore().collection('history').where("grow", ">=", 0).get()

    console.log(`Se necesita crecer: ${grow}ºC`)
    if (snapshot.docs.length) {
      snapshot.docs.forEach(doc => {
        let docGas = doc.data()["gas"]
        let docGrow = doc.data()["grow"]
        if (docGrow !== 0 && docGas !== 0 && docGas >= 10) {
          N++
          growPerGas += docGrow / docGas
        }
        console.log(`Document gas: ${docGas}% grow: ${docGrow}ºC`)

        // Optimo
        if (grow === docGrow) {
          gas = docGas
          exact = true;
        }

        // Mayor
        if (grow <= docGrow) {
          high = docGas < 1 ? 1 : docGas - 1
        }

        // Menor
        if (grow >= docGrow) {
          low = docGas > 99 ? 99 : docGas + 1
        }

      })
      console.log(`Grow Per gas = ${growPerGas / N}`)
      growPerGas /= N
      if (!gas) {
        console.log("High " + high)
        high = high < grow / growPerGas ? high : grow / growPerGas
        high = Math.floor(high - 1)
        // high = (grow /  growPerGas)
        // high = high > 100 ? 100 : high
        console.log(`High: ${high} Low: ${low}`)
        gas = Math.floor(Math.random() * (high - low)) + low
        // if(gas < 0){
        //   gas = 0
        // }
      }
      console.log(`Se asignara: ${gas}%`)
    } else {
      gas = Math.floor(Math.random() * 10) + 1
      console.log(`No se encontro registro parecido a ${grow}`)
      console.log(`Se asignara valor de gas de ${gas}`)
    }
    return gas
  }

  getBigger(a, b) {
    return a >= b ? a : b
  }



  render() {

    return (
      <div className="App">
        <div className="results">
          <img className="logo" src="http://pre03.deviantart.net/affb/th/pre/i/2012/059/8/9/fire_vector_by_lekadema-d4r921b.png" />
          <h2>Crisol </h2>
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
