import React, { Component } from 'react';

import AddingForm from './components/addingform.js';
import Recipes from './components/recipes.js';

import './App.css';
import './material.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adding : false,
      editing: false,
    }
  }

  addRecipe(){
    this.setState({
      adding: !this.state.adding
    })
  }
  
  render() {
    var show = null;
    if(this.state.adding){
      show = <AddingForm />;
    }else{
      show = <Recipes />;
    }

    return (
      <div className="App">
          <button onClick={this.addRecipe.bind(this)} className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
              <i className="material-icons">+</i>
          </button>
          {show}          
      </div>
    );
  }
}

export default App;
