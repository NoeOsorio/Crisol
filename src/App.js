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
    };
    this.handlePlay = this.handlePlay.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }

  addFirestore() {
    let add = firebase.firestore().collection("users").add({ nombre: "noe" })
    console.log("Añadido")
  }

  handlePlay() {
    console.log('Play!');
    console.log(this.state.temperature);
    console.log(this.state.fan);
    console.log(this.state.gas);
  }

  handleStop() {
    console.log('Stop!');
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
                    <input type="text" name="name" onInput={e => this.setState({ temperature: e.target.value })} />
                  </th>
                </tr>
                <tr>
                  <th>
                    <label>
                      Ventilador:
                  </label>
                  </th>
                  <th>
                    <input type="text" name="name" onInput={e => this.setState({ fan: e.target.value })} />
                  </th>
                </tr>
                <tr>
                  <th>
                    <label>
                      Gas:
                  </label>
                  </th>
                  <th>
                    <input type="text" name="name" onInput={e => this.setState({ gas: e.target.value })} />
                  </th>
                </tr>
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
