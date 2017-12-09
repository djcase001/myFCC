import React, {
    Component
} from 'react';
import logo from '../logo.png';


class SignIn extends Component {
    constructor(props) {
        super(props)
        this.LOGIN = this.LOGIN.bind(this);
    }

    LOGIN() {
        const user = {
            email : this.refs.emailInput.value,
            password : this.refs.passwordInput.value
        }
        this.props.login(user, "login");
    }

    render() {
        if(this.props.error){
            var mode = (<div className="ui error message visible">
                            <i className="close icon"></i>
                            <div className="header">
                                {this.props.error}
                            </div>
                        </div>);
        }else{
            var mode = (<div className="ui error message hidden">
                            <i className="close icon"></i>
                            <div className="header">
                                {this.props.error}
                            </div>
                        </div>);
        }
        return (
            <div>
                <h2 className="ui teal image header">
                    <img className="image" src={logo} />
                    <div className="content">Se Connecter</div>
                </h2>
                <form className="ui large form">
                    <div className="ui stacked segment" >
                        <div className="field" >
                            <div className="ui left icon input" >
                                <i className="user icon" > < /i>
                                <input type = "email" name="email" placeholder = "E-mail address" ref='emailInput' />
                            </div>
                        </div>
                        <div className="field" >
                            <div className="ui left icon input" >
                                <i className="lock icon"> </i>
                                <input type = "password" name="password" placeholder="Password" ref='passwordInput'/>
                            </div>
                        </div>
                        <div className="ui fluid large teal submit button" onClick={this.LOGIN} >
                            Se Connecter
                        </div>
                    </div>
                    {mode}
                </form>
            </div>

        )
    }
}

export default SignIn;
