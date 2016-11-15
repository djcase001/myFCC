import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { }
  }

  componentWillMount() {
    
     var xhr = new XMLHttpRequest();
    xhr.open('GET', 'alltime.json');
    xhr.onreadystatechange = ()=>{
      if(xhr.readyState === 4 && xhr.status === 200){
        var informations = JSON.parse(xhr.responseText);
        this.setState({
          data : informations
        });

      }
    }
    xhr.send(null);    
  }

  render() {

    var temporaire = this.state.data;
    var count = 0;
      var campers = temporaire ? temporaire.map(camper => {
        count++;
        return (
            <tr>
              <td className="mdl-data-table__cell--non-numeric">{count}</td>
              <td className="mdl-data-table__cell--non-numeric">{camper.username}</td>
              <td className="mdl-data-table__cell--non-numeric">{camper.lastUpdate}</td>
              <td className="mdl-data-table__cell--non-numeric">{camper.recent}</td>
              <td className="mdl-data-table__cell--non-numeric">{camper.alltime}</td>
            </tr>
          );
      }) : '';    
    
    return (
      <div className="App">
        <table className="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">
          <thead>
            <tr>
              <th className="mdl-data-table__cell--non-numeric">#</th>
              <th className="mdl-data-table__cell--non-numeric">username</th>
              <th className="mdl-data-table__cell--non-numeric">last update</th>
              <th>recent</th>
              <th>alltime</th>
            </tr>
          </thead>
          <tbody>
              {campers}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
