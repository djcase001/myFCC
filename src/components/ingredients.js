import React, { Component } from 'react';

export default class Ingredients extends Component {
	render() {
		var ingredient = this.props.item.split(",").map((item, i) => <li key={i} className="ingredient">{item}</li>);
		return ( <ul className="ingredients-list">
				    {ingredient}
				  </ul>);
	}
}