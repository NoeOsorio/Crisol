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
      porcentaje: 0,
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
    // this.setState({
    //   interval: setInterval(() => this.warm(this.state.temperature), 1000)
    // })

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
    // return (temperatura_anterior) + (gas * gas) - 2 - (ventilador ? 3 : 0)
    return (temperatura_anterior) + (gas * gas) - 40 - (ventilador ? 3 : 0)
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



  getFanCounter(grow) {
    return grow < 0;
  }

  async warm() {

    var last = this.state.temperature
    var needed = this.getDiff(last)
    var fan = this.getFanCounter(needed)
    var gas = await this.getGasDB(needed, fan)

    var temp = parseInt(this.getTemperature(last, gas, fan))
    var grow = temp - last


    if (last <= this.state.goal + 10 && last >= this.state.goal - 10) {
      needed = this.getDiff(temp)
      fan = this.getFanCounter(needed)
      gas = await this.getGasDB(needed, fan)
      temp = parseInt(this.getTemperature(last, gas, fan))
    }

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

  async getGasDB(grow, fan) {

    if (fan) {
      return 0
    }
    // if (grow <= 0) {
    //   return 0
    // }
    // Variables de entranemiento
    let training = false
    let cooling = false
    // let boiling = false
    // GAS
    let N = 1
    let gas = 0
    let growPerGas = 1
    let low = 0, high = 100 //Gas
    // let upSnapshot = await firebase.firestore().collection('history').where("grow", ">=", 0).get()
    // let downSnapshot = await firebase.firestore().collection('history').where("grow", "<", 0).get()
    let snapshot = await firebase.firestore().collection('history').get()

    console.log(`\n Se necesita crecer: ${grow}ºC`)

    if (snapshot) {
      if (snapshot.docs.length < 10) {
        console.log("Entrenando")
        high = Math.floor(Math.random() * 10) + 1
        training = true
      }

      snapshot.docs.forEach(doc => {
        console.log(doc.data())
        let docGas = doc.data()["gas"]
        let docGrow = doc.data()["grow"]
        let docTemp = doc.data()["temperature"]

        if (docTemp >= this.state.goal) {
          high = docGas
        }
        if (docGrow !== 0 && docGas !== 0) {
          growPerGas = docGrow / docGas > growPerGas ? docGrow / docGas : growPerGas
        }
        if (grow === docGrow) {
          low = docGas
          high = docGas
        }
        else if (grow > docGrow) {
          // low = low < high ? docGas : low
          if (low < high) {
            low = docGas + 1
          }
          else if (high < low) {
            high = training ? low + 1 : high
          }
        } else {
          if (high > low) {
            high = docGas - 1
          }
          else if (low > high) {
            low = training ? high - 1 : low
          }
        }

      })
      if (grow > 0) {
        console.log("Grow Per Gas: ", grow / growPerGas);
      }
      // Ojala esto funciones:

      // low++;

      if (high > grow / growPerGas && grow / growPerGas > low) {
        console.log(`Cambio de high Anterior: ${high} Nuevo: ${Math.round(grow / growPerGas)}`)
        high = Math.round(grow / growPerGas)

      }

      if (high < low) {
        high = low
      }
      console.log(`High: ${high} Low: ${low}`)
      gas = Math.floor(Math.random() * (high - low)) + low
      console.log(gas);


    } else {
      // Primera vez
      gas = Math.floor(Math.random() * 10) + 1
      console.log(`No se encontro registro parecido a ${grow}%`)
      console.log(`Se asignara valor de gas de ${gas}`)
    }


    // if (upSnapshot.docs.length || downSnapshot.docs.length) {

    //   // Aprender
    //   if (upSnapshot.docs.length < 10) {
    //     gas = upSnapshot.docs.length + 1
    //     training = true;
    //     console.log(`Se asigna gs de entrenamiento ${gas}`)
    //   }
    //   if (downSnapshot.docs.length) {
    //     let lessLow = -1000
    //     downSnapshot.docs.forEach(doc => {
    //       let docGas = doc.data()["gas"]
    //       let docGrow = doc.data()["grow"]

    //       if (lessLow < docGas) {
    //         lessLow = docGas
    //       }


    //       if (grow >= docGrow) {
    //         low = docGas > 99 ? 99 : docGas + 1
    //         console.log(`Low desde downSnapshot: ${low}`)
    //       }

    //     })

    //     if (gas <= lessLow) {
    //       gas = lessLow + 1
    //       training = false
    //       cooling = true
    //       console.log(`Se asigna minimo de gas ${gas}`)
    //     }

    //   }

    //   upSnapshot.docs.forEach(doc => {
    //     let docGas = doc.data()["gas"]
    //     let docGrow = doc.data()["grow"]
    //     if (docGrow !== 0 && docGas !== 0) {
    //       N++
    //       growPerGas = docGrow / docGas > growPerGas ? docGrow / docGas : growPerGas

    //     }
    //     console.log(`Document gas: ${docGas}% grow: ${docGrow}ºC`)

    //     // Optimo
    //     if (grow === docGrow) {
    //       gas = docGas
    //     }

    //     // Mayor
    //     if (grow <= docGrow) {
    //       high = docGas < 1 ? 1 : docGas - 1
    //     }

    //     // Menor
    //     if (grow >= docGrow) {
    //       low = docGas > 99 ? 99 : docGas + 1
    //     }

    //   })

    //   console.log(`Grow per gas: ${growPerGas}`)

    //   console.log("High " + high)
    //   console.log(`High grow: ${grow / growPerGas}`);

    //   // Cambiar relacion
    //   high = high < grow / growPerGas ? high : grow / growPerGas
    //   high = Math.round(high)
    //   console.log(`High: ${high} Low: ${low}`)
    //   let tmpGas = Math.floor(Math.random() * (high - low)) + low

    //   if (cooling) {
    //     console.log("Cooling")
    //     console.log(`Tmpgas : ${tmpGas} Gas: ${gas}`);

    //     if (tmpGas > gas) {
    //       gas = tmpGas
    //     }
    //   }
    //   else {
    //     if (!training) {
    //       console.log("Se sigue normal");
    //       gas = tmpGas
    //     }
    //   }



    //   gas = training ? gas : (cooling ? (tmpGas > gas ? tmpGas : gas) : tmpGas)

    //   console.log(`Se asignara: ${gas}%`)
    // } else {
    //   // Primera vez
    //   gas = Math.floor(Math.random() * 10) + 1
    //   console.log(`No se encontro registro parecido a ${grow}%`)
    //   console.log(`Se asignara valor de gas de ${gas}`)
    // }
    return gas > 0 ? gas : 0
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
