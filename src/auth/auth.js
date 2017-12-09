import React, { Component } from 'react';
import { Button} from 'semantic-ui-react';
//import { Button, Container, Header, Form, Input, Icon } from 'semantic-ui-react';
import './auth.css';
import SignIn from './signin';
import SignUp from './signup';

class Auth extends Component {
    constructor(props){
        super(props);
        this.triggerSubmit = this.triggerSubmit.bind(this);
        this.switchForm = this.switchForm.bind(this);
        this.state = {
            login: true
        }
    }


    switchForm(){
        this.setState({
            login: !this.state.login
        })

    }

    triggerSubmit(email, password, which){
        const user = {
            email: email,
            password: password
        }
        this.props.authed(user, which);

    }

    render() {
        var view = this.state.login ? <SignIn login = {this.triggerSubmit}/> : <SignUp signup = {this.triggerSubmit}/>

        var whichForm = this.state.login ? "S'Inscrire" : "Se Connecter";
        return (
            <div className="container">
            {view}

            <Button type="button" content={whichForm} onClick={this.switchForm}/>
            </div>
        );
    }
}

export default Auth;
