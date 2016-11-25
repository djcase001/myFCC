import React, { Component } from 'react';

import AddingForm from './components/addingform.js';
import Recipes from './components/recipes.js';

import './App.css';
// import './material.min.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adding : false,
      editing: false,
      recipes: JSON.parse(this.props.data),
      recipe: null,
      recipeId: null
    }
  }

  cancel(){
    this.setState({
      editing: false,
      adding: false
    });

  }

  addRecipe(){
    this.setState({
      adding: !this.state.adding,
      editing: false
    });
  }

  editRecipe(){
    this.setState({
      editing: !this.state.editing,
      adding: false
    });
  }

  updateRecipe(name, ingredients, i){
    var arr = this.state.recipes;
    arr[i]= {
      name: name,
      ingredients: ingredients
    };
    this.props.storage.setItem("recipes", JSON.stringify(arr));
    this.setState({
      recipes: this.state.recipes,
      editing: false
    });

  }

  addingRecipe(name, ingredients){
    var recipes = this.state.recipes;
    var toBeAdded = {
      name: name,
      ingredients: ingredients
    };
    
    
    recipes.push(toBeAdded);
    console.dir(recipes);
    this.props.storage.setItem("recipes", JSON.stringify(recipes));
    this.setState({
      recipes: this.state.recipes,
      adding: false
    }); 
  }

  editingRecipe(i){
    this.editRecipe();
    this.setState({
      recipe: this.state.recipes[i],
      recipeId: i
    });
  }

  deleteRecipe(id){
    var arr = this.state.recipes;
    arr.splice(id, 1);
    this.props.storage.setItem('recipes', JSON.stringify(arr));
    this.setState({
      recipes: this.state.recipes
    });
  }

  eachRecipe(recipe, i){
     return (<Recipes key={i} index={i} 
      data={recipe}
      onRemove={this.deleteRecipe.bind(this)}
      onUpdate={this.editingRecipe.bind(this)}
      />);
  }
  
  render() {
    // console.log(this.state.recipes);
    var show = null;
    if(this.state.adding){
      show = <AddingForm cancelOperations={this.cancel.bind(this)} buildRecipe={this.addingRecipe.bind(this)}/>;
    }else if(this.state.editing){
      show = <AddingForm cancelOperations={this.cancel.bind(this)} index={this.state.recipeId} recipe={this.state.recipe} editRecipe={this.updateRecipe.bind(this)}/>;
    }else{
      show = this.state.recipes.map((recipe, i) => this.eachRecipe(recipe, i));
    }

    return (
      <div className="App">
          <button onClick={this.addRecipe.bind(this)} className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
              <i className="material-icons">+</i>
          </button>
          <ul className="recipe list">
            {show}
          </ul>       
      </div>
    );
  }
}

export default App;
