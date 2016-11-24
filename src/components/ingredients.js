import React, { Component } from 'react';

export default class Ingredients extends Component {
	render() {
		var ingredient = this.props.item.split(",").map((item, i) => <li key={i} className="mdl-list__item">{item}</li>);
		return ( <ul className="demo-list-item mdl-list">
					    {ingredient}
					  </ul>);
	}
}