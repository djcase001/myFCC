import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

var ls = window.localStorage;
if(!ls.getItem("recipes")){
	ls.setItem("recipes", JSON.stringify([{name: "Asian food", ingredients: "Aloo saag, Bhajia, Bombay potato, Chapatti, gujerati, punjabi"}]));
    
}
ReactDOM.render(
  <App data={ls.getItem("recipes")} storage={ls} />,
  document.getElementById('root')
);
