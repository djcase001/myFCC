import React, {
    Component
} from 'react';


class SignIn extends Component {
    constructor(props) {
        super(props)
        this.LOGIN = this.LOGIN.bind(this);
    }

    LOGIN() {
        this.props.login(this.emailInput.value, this.passwordInput.value, "login");
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
                    <img className="image" />
                    <div className="content">Se Connecter</div>
                </h2>
                <form className="ui large form">
                    <div className="ui stacked segment" >
                        <div className="field" >
                            <div className="ui left icon input" >
                                <i className="user icon" > < /i>
                                <input type = "email"      name="email" placeholder = "E-mail address" ref = {(input) => { this.emailInput = input }} />
                            </div>
                        </div>
                        <div className="field" >
                            <div className="ui left icon input" >
                                <i className="lock icon"> </i>
                                <input type = "password" name="password" placeholder="Password" ref={(input) => {this.passwordInput = input}}/>
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
