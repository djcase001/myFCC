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
		var txtarea = document.getElementsByTagName('textarea');
    if(inputs[0].value !== "" && txtarea[0].value !== ""){
      this.props.buildRecipe(inputs[0].value, txtarea[0].value);
    }
	}

  updateRecipe(){
    var inputs = document.getElementsByTagName('input');
    var txtarea = document.getElementsByTagName('textarea');
    if(inputs[0].value !== "" && txtarea[0].value !== ""){
      this.props.editRecipe(inputs[0].value, txtarea[0].value, this.props.index);
    }
  }


	render(){
      var show = null;
      var bouton = null;
      if(this.props.recipe){
          show = (<form>
              <div className="textfield-container">
                <input className="textfield" type="text" placeholder="recipe's name" defaultValue={this.state.recipe.name} />
                <textarea className="textfield" cols="20" rows="5" maxLength="140"   defaultValue={this.state.recipe.ingredients}  type="text" placeholder="recipe's ingredients"></textarea>
              </div>
            </form>);
          bouton = (<button onClick={this.updateRecipe.bind(this)}  className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">
                Edit Recipe
              </button>);
      }else{
        show = (<form>
              <div className="textfield-container">
                <input className="textfield" type="text" placeholder="recipe's name"  />
                <textarea className="textfield" cols="20" rows="5" maxlength="140" type="text" placeholder="recipe's ingredients"></textarea>
              </div>
            </form>);
        bouton = (<button onClick={this.addRecipe.bind(this)}  className="btn">
                Add Recipe
              </button>);
      }

	      return (
          <div className="card form-container">
            <div className="card-title">
              <h2 className="card-title-text">Add a recipe</h2>
            </div>
            {show}
            
            <div className="btn-container">
              {bouton}
              <button onClick={this.cancelOp.bind(this)} className="btn">
                Close
              </button>
            </div>
          </div>
	      );
	}
}