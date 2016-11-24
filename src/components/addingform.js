import React, { Component } from 'react';

export default class AddingForm extends Component {
	constructor(props){
		super(props)
		this.state = {
      recipe: this.props.recipe
    };
	}

  cancelOp(){
    this.props.cancelOperations();
  }

	addRecipe(){
		var inputs = document.getElementsByTagName('input');
    if(inputs[0].value !== "" && inputs[1].value !== ""){
      this.props.buildRecipe(inputs[0].value, inputs[1].value);
    }
	}

  updateRecipe(){
    var inputs = document.getElementsByTagName('input');
    if(inputs[0].value !== "" && inputs[1].value !== ""){
      this.props.editRecipe(inputs[0].value, inputs[1].value, this.props.index);
    }
  }


	render(){
      var show = null;
      var bouton = null;
      if(this.props.recipe){
          show = (<form>
              <div className="mdl-textfield mdl-js-textfield">
                <input defaultValue={this.state.recipe.name} className="mdl-textfield__input" type="text" placeholder="recipe's name"/>
                <input defaultValue={this.state.recipe.ingredients} className="mdl-textfield__input" type="text" placeholder="recipe's ingredients"/>
              </div>
            </form>);
          bouton = (<button onClick={this.updateRecipe.bind(this)}  className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">
                Edit Recipe
              </button>);
      }else{
        show = (<form>
              <div className="mdl-textfield mdl-js-textfield">
                <input className="mdl-textfield__input" type="text" placeholder="recipe's name"/>
                <input className="mdl-textfield__input" type="text" placeholder="recipe's ingredients"/>
              </div>
            </form>);
        bouton = (<button onClick={this.addRecipe.bind(this)}  className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">
                Add Recipe
              </button>);
      }

	      return (
          <div className="demo-card-wide mdl-card mdl-shadow--2dp">
            <div className="mdl-card__title">
              <h2 className="mdl-card__title-text">Add a recipe</h2>
            </div>
            {show}
            
            <div className="mdl-card__actions mdl-card--border">
              {bouton}
              <button onClick={this.cancelOp.bind(this)} className="mdl-button mdl-js-button mdl-button--accent">
                Close
              </button>
            </div>
          </div>
	      );
	}
}