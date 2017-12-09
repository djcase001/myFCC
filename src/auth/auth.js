import React, { Component } from 'react';
//import { Button} from 'semantic-ui-react';
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
        var view = this.state.login ? <SignIn error={this.props.errMessage} login={this.triggerSubmit}/> : <SignUp error={this.props.errMessage} signup={this.triggerSubmit}/> ;
        var mesaj = this.state.login ? "Nouveau?" : "Deja membre?";
        var whichForm = this.state.login ? "S'Inscrire" : "Se Connecter";
        return (
            <div className = "ui middle aligned center aligned grid" >
                <div className="column">
                    {view}
                    <div className="ui message">{mesaj}
                        <span className="link" onClick={this.switchForm}> {whichForm} </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Auth;
