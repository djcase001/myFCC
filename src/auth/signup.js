import React, { Component } from 'react';
//import { Button, Container, Header, Form, Input, Icon } from 'semantic-ui-react';

class SignUp extends Component {
    constructor(props){
        super(props)
        this.SIGNUP = this.SIGNUP.bind(this);
    }

    SIGNUP (){
        this.props.signup(this.emailInputSignUp.value, this.passwordInputSignUp.value, "signup");
    }

    render(){
        if(this.props.error){
            var mode = (<div className="ui error message visible">{this.props.error}</div>);
        }else{
            var mode = (<div className="ui error message hidden">{this.props.error}</div>);
        }
        return(
            <div>
                <h2 className="ui teal image header">
                    <img className="image" />
                    <div className="content">S'Inscrire</div>
                </h2>
                <form className="ui large form">
                    <div className="ui stacked segment" >
                        <div className="field" >
                            <div className="ui left icon input" >
                                <i className="user icon" > < /i>
                                <input type = "email"  name="email" placeholder = "E-mail address" ref={(input) => { this.emailInputSignUp = input }} />
                            </div>
                        </div>
                        <div className="field" >
                            <div className="ui left icon input" >
                                <i className="lock icon"> </i>
                                <input type = "password" name="password" placeholder="Password" ref={(input) => {this.passwordInputSignUp = input}}/>
                            </div>
                        </div>
                        <div className="ui fluid large teal submit button" onClick={this.SIGNUP} >
                            S'Inscrire
                        </div>
                    </div>
                    {mode}
                </form>
            </div>
        )
    }
}

export default SignUp;
