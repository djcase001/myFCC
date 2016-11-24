import React, { Component } from 'react';

import Ingredients from './ingredients.js';

class Recipes extends Component {
	// constructor(props){
	// 	super(props)
		
	// }
	deleteRecipe(){
		this.props.onRemove(this.props.index);
	}

	updateRecipe(){
		this.props.onUpdate(this.props.index);
	}
	
	render(){

					

	      return (<div className="demo-card-wide mdl-card mdl-shadow--2dp">
					  <div className="mdl-card__title">
					    <h2 className="mdl-card__title-text">{this.props.data.name}</h2>
					  </div>
					 <Ingredients item={this.props.data.ingredients}/>
					  <div className="mdl-card__actions mdl-card--border">
					    <button onClick={this.updateRecipe.bind(this)} className="btn mdl-button  mdl-js-button mdl-js-ripple-effect">
					      Edit
					    </button>
					    <button onClick={this.deleteRecipe.bind(this)} className="btn mdl-button mdl-js-button mdl-button--colored">
					      Delete
					    </button>
					  </div>
					  <div className="mdl-card__menu">
					    <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
					      <i className="material-icons">+</i>
					    </button>
					  </div>
				  	</div>);
	}
}

export default Recipes;