import React, { Component } from 'react';
import quotes from '../motivation';
import './quotes.css';

class Quotes extends Component {
    constructor(props){
        super(props);
        this.switchQuote = this.switchQuote.bind(this);
        this.state = {
            num: Math.floor(Math.random() * (quotes.length - 1 - 0) + 0),
            quotes: quotes
        }
    }

    componentDidMount(){

    }

    componentWillMount(){}

    switchQuote(e){
        let vm = this;

        if(e.target.className.indexOf('left')!== -1){
            if(vm.state.num === 0){
                vm.setState({
                    num: vm.state.quotes.length - 1
                })
            }else{
                vm.setState({
                    num: vm.state.num - 1
                })
            }
        }else{
            if(vm.state.num === (vm.state.quotes.length -1) ){
                vm.setState({
                    num: 0
                })
            }else{
                vm.setState({
                    num: vm.state.num + 1
                })
            }
        }
    }

    render() {
        let bookQuotes = this.state.quotes ? this.state.quotes : [];
        let singleQuote = bookQuotes[this.state.num];
        console.log(this.state.num);
        return (
            <div className="four wide column">
                <div className="ui black message">
                    <i onClick={this.switchQuote} className="angle left icon custom-button-left"></i>
                    <i onClick={this.switchQuote} className="angle right icon custom-button-right"></i>
                    <blockquote>{singleQuote.text}</blockquote>
                    <span><a target="blank" href={singleQuote.reference}>{singleQuote.source}</a></span>
                </div>
            </div>
        );
    }
}



export default Quotes;
