import React, { Component } from 'react';
import { Button, Container, Header, Form, Input, Icon } from 'semantic-ui-react';

class SignUp extends Component {
    constructor(props){
        super(props)
        this.SIGNUP = this.SIGNUP.bind(this);
    }

    SIGNUP (){
        const email = this.emailInput.inputRef.value;
        const password = this.passwordInput.inputRef.value;
        console.log(email, password);
        this.props.signup(email, password, "signup");
    }

    render(){
        return(
            <Form.Field>
            <Header content="S'inscrire" />
            <label>Enter Email</label>
            <Input type='email' name='email' ref={(input) => { this.emailInput = input}}/>
            <label>Enter Password</label>
            <Input type='password' name='password' ref={(input) => { this.passwordInput = input}}/>
            <Input
            type="submit"
            content="Inscrire"
            onClick={this.SIGNUP}
            />
                </Form.Field>
        )
    }
}

export default SignUp;
