import React, { Component } from 'react';
//import { Button, Container, Header, Form, Input, Icon } from 'semantic-ui-react';
import logo from '../logo.png';

class SignUp extends Component {
    constructor(props){
        super(props)
        this.SIGNUP = this.SIGNUP.bind(this);
    }

    SIGNUP (){

        const user = {
            nom : this.refs.nomInputSignUp.value,
            prenom : this.refs.prenomInputSignUp.value,
            email : this.refs.emailInputSignUp.value,
            password : this.refs.passwordInputSignUp.value
        }
        this.props.signup(user, "signup");
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
                    <img className="image" src={logo}/>
                    <div className="content">S'Inscrire</div>
                </h2>
                <form className="ui large form">
                    <div className="ui stacked segment" >
                        <div className="field" >
                            <div className="ui left icon input" >
                                <i className="user icon" > < /i>
                        <input type = "text"  name="nom" placeholder="nom" ref='nomInputSignUp' />
                            </div>
                        </div>
                        <div className="field" >
                            <div className="ui left icon input" >
                                <i className="user icon" > < /i>
                                <input type = "text"  name="prenom" placeholder="prenom" ref='prenomInputSignUp' />
                            </div>
                        </div>
                        <div className="field" >
                            <div className="ui left icon input" >
                                <i className="user icon" > < /i>
                                <input type = "email"  name="email" placeholder="E-mail address" ref="emailInputSignUp" />
                            </div>
                        </div>
                        <div className="field" >
                            <div className="ui left icon input" >
                                <i className="lock icon"> </i>
                                <input type = "password" name="password" placeholder="Password" ref="passwordInputSignUp"/>
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
