import React, { Component } from 'react';
import { Button, Container, Header, Form, Input, Icon } from 'semantic-ui-react';

class SignIn extends Component {
    constructor(props){
        super(props)
        this.LOGIN = this.LOGIN.bind(this);
    }
    LOGIN(){
        const email = this.emailInput.inputRef.value;
        const password = this.passwordInput.inputRef.value;
        console.log(email, password);
        this.props.login(email, password, "login");
    }

    render(){
        return(
            <Form.Field>
            <Header content="Se connecter" />
            <label>Enter Email</label>
            <Input type='email' name='email' ref={(input) => { this.emailInput = input}}/>
            <label>Enter Password</label>
                <Input type='password' name='password' ref={(input) => { this.passwordInput = input}}/>
                    <Input
                type="submit"
                content="Submit"
                onClick={this.LOGIN}
                />
                    </Form.Field>
                )
}
}

export default SignIn;
