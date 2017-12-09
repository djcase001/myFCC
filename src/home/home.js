import React, { Component } from 'react';
import {Link, BrowserRouter, Route} from 'react-router-dom';
import {Header, Button} from 'semantic-ui-react';

class Home extends Component {
    constructor(props){
        super(props);
        this.SignOut = this.SignOut.bind(this);
        console.log(this.props.USER.email);
    }

    SignOut (){
        const auth = this.props.FIREBASE.auth();
        auth.signOut();
    }

    render() {

        return (
            <div className="ui three column grid">
            <h3> Welcome to the home page {this.props.USER.email}</h3>
                <Button content="Se Deconnecter" type='button' onClick={this.SignOut}/>
            </div>
        );
    }
}

export default Home;
