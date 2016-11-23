import React, { Component } from 'react';

class Recipes extends Component {
	constructor(props){
		super(props)
		this.state = {
			recipes: [{ name: "Cassolet", ingredients: "Pois, farine, Sel"}, {name: "Mais au Lait", ingredients: "Mais, Lait"}]
		};
	}

	
	render(){

		var recipe = this.state.recipes.map((item, i) => <div className="demo-card-wide mdl-card mdl-shadow--2dp" key={i}>
					  <div className="mdl-card__title">
					    <h2 className="mdl-card__title-text">{item.name}</h2>
					  </div>
					  <div className="mdl-card__supporting-text">
					    {item.ingredients}
					  </div>
					  <div className="mdl-card__actions mdl-card--border">
					    <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
					      Get Started
					    </a>
					  </div>
					  <div className="mdl-card__menu">
					    <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
					      <i className="material-icons">+</i>
					    </button>
					  </div>
				  	</div>);

	      return (<div>
	      			{recipe}
	      		</div>);
	}
}

export default Recipes;