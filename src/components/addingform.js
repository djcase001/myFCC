import React, { Component } from 'react';

export default class AddingForm extends Component {
	constructor(props){
		super()
		this.state = {};
	}

	render(){

	      return (
          <div className="demo-card-wide mdl-card mdl-shadow--2dp">
            <div className="mdl-card__title">
              <h2 className="mdl-card__title-text">Add a recipe</h2>
            </div>
            <form action="#">
              <div className="mdl-textfield mdl-js-textfield">
                <input className="mdl-textfield__input" type="text" placeholder="recipe's name"/>
                <input className="mdl-textfield__input" type="text" placeholder="recipe's ingredients"/>
              </div>
            </form>
            
            <div className="mdl-card__actions mdl-card--border">
              <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">
                Add Recipe
              </button>
              <button className="mdl-button mdl-js-button mdl-button--accent">
                Close
              </button>
            </div>
          </div>
	      );
	}
}