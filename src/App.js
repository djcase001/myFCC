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
      recipes: [{ name: "Cassolet", ingredients: "Pois, farine, Sel"},
       {name: "Mais au Lait", ingredients: "Mais, Lait"}]
    }

  }

  addRecipe(){
    this.setState({
      adding: !this.state.adding
    });
  }

  addingRecipe(name, ingredients){
    var recipes = this.state.recipes;
    var toBeAdded = {
      name: name,
      ingredients: ingredients
    };
    recipes.push(toBeAdded);
    this.setState({
      recipes: recipes
    })
  }
  
  render() {
    var show = null;
    if(this.state.adding){
      show = <AddingForm buildRecipe={this.addingRecipe.bind(this)}/>;
    }else{
      show = <Recipes data={this.state.recipes}/>;
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
