import React, { Component } from 'react';

import Ingredients from './ingredients.js';

class Recipes extends Component {
	// constructor(props){
	// 	super(props)
		
	// }

	
	render(){

		var recipe = this.props.data.map((item, i) => <div className="demo-card-wide mdl-card mdl-shadow--2dp" key={i}>
					  <div className="mdl-card__title">
					    <h2 className="mdl-card__title-text">{item.name}</h2>
					  </div>
					 <Ingredients item={item.ingredients}/>
					  <div className="mdl-card__actions mdl-card--border">
					    <button className="btn mdl-button  mdl-js-button mdl-js-ripple-effect">
					      Edit
					    </button>
					    <button className="btn mdl-button mdl-js-button mdl-button--colored">
					      Delete
					    </button>
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