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

					
				
	      return (<div>
				    <li id={'recipe'+ this.props.index} className="item">
				      <a href={'#recipe'+ this.props.index}>
				        <h3>{this.props.data.name}</h3>
				      </a>
				      <h4>Ingredients</h4>
				      <Ingredients item={this.props.data.ingredients}/>
				     <div className="btn-container">
				       <button onClick={this.updateRecipe.bind(this)} className="btn">
				      Edit
				      </button>
				      <button onClick={this.deleteRecipe.bind(this)} className="btn">
				        Delete
				      </button>
				     </div>
				    </li>
				    </div>);
	}
}

export default Recipes;