import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons'

class App extends React.Component {


  handlePlay() {
    console.log('Play!');
  }

  handleStop() {
    console.log('Stop!');
  }

  render() {
    return (
      <div className="App">
        <div className="results">
          <img className="logo" src="http://pre03.deviantart.net/affb/th/pre/i/2012/059/8/9/fire_vector_by_lekadema-d4r921b.png" />
          <h2>Resultados: </h2>
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
                    <input type="text" name="name" onInput={e => console.log(e)}/>
                  </th>
                </tr>
                <tr>
                  <th>
                    <label>
                      Ventilador:
                  </label>
                  </th>
                  <th>
                    <input type="text" name="name" onInput={e => console.log(e)}/>
                  </th>
                </tr>
                <tr>
                  <th>
                    <label>
                      Gas:
                  </label>
                  </th>
                  <th>
                    <input type="text" name="name" onInput={e => console.log(e)}/>
                  </th>
                </tr>
                <tr>
                  <th>
                    <FontAwesomeIcon className="playButton" icon={faPlay} onClick={this.handlePlay} />
                    Play
                </th>
                  <th>
                    <FontAwesomeIcon className="stopButton" icon={faStop} onClick={this.handleStop} />
                    Stop
                </th>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div >
    );
  }

}

export default App;
