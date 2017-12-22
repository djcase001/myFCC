import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom';

import * as firebase from 'firebase';

import Auth from './auth/auth';
import Home from './home/home';

const config = {
    apiKey: "AIzaSyCpVnVeaiX5Boo3Df4u8Ko7_wIOxFHaw2c",
    authDomain: "fin-perso.firebaseapp.com",
    databaseURL: "https://fin-perso.firebaseio.com",
    projectId: "fin-perso",
    storageBucket: "fin-perso.appspot.com",
    messagingSenderId: "751633041614"
};
firebase.initializeApp(config);

const auth = {
    isAuthenticated: false
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
            auth.isAuthenticated ?
            (<Component {...props}/>)
            :
            (<Redirect to={{pathname: '/',  state: { from: props.location } }}/>)
        )}/>
)

let User = null;

firebase.auth().onAuthStateChanged(function(user){
    if(user){
        auth.isAuthenticated = true;
        User = user;
    }else{
        console.log("firebase message : Not logged in");
        auth.isAuthenticated = false;
        User = null;
    }
});


const Protected = () => (<Home USER={User} userId={User.uid} FIREBASE={firebase} />)

class App extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged(function(user){
            if(user){
                auth.isAuthenticated = true;
            }else{
                auth.isAuthenticated = false;
            }
        });
    }

    render (){


        return (<Router>
                    <div>
                        <Route path="/" component={Login}/>
                        <PrivateRoute path="/accueil" component={Protected}/>
                    </div>
                </Router>);
    }
}

class Login extends Component {
    constructor(props){
        super(props);
        this.authenticate = this.authenticate.bind(this);
        this.state = {
            errorMsg: null,
            redirectToReferrer: false
        }
    }

    componentWillMount(){
        let vm = this;
        firebase.auth().onAuthStateChanged(function(user){
            if(user){
                auth.isAuthenticated = true;
                vm.setState({
                    redirectToReferrer: true
                })
            }else{
                auth.isAuthenticated = false;
                vm.setState({
                    redirectToReferrer: false
                })
            }
        });
    }

    authenticate(user, mode){
        var vm = this;
        const auth = firebase.auth();
        const db = firebase.database();
        if(mode === 'login'){
            auth.signInWithEmailAndPassword(user.email, user.password)
                .then(
                function(loggedUser){
                    console.log("User has been logged in", loggedUser.uid);
                })
                .catch(function(e){
                console.log(e.message);
                vm.setState({
                    errorMsg: e.message
                });
            });
        }
        if(mode === 'signup'){
            auth.createUserWithEmailAndPassword(user.email, user.password).then(
                function(loggedUser){
                    console.log("User has been logged in", loggedUser.uid);
                    user.password = null;
                    db.ref().child('users').child(loggedUser.uid).set(user).then(function(err){
                        console.log(err, "Saved successfully");
                    });
                })
                .catch(function(e){
                console.log(e.message);
                vm.setState({
                    errorMsg: e.message
                });
            });
        }

    }

    render() {

        const { from } = this.props.location.state || { from: { pathname: '/accueil' } }
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return (
                <Redirect to={{ pathname: '/accueil' }}/>
            )
        }

        return (
            <div>
                <Redirect to={{ pathname: '/' }}/>
                <Auth errMessage={this.state.errorMsg} authed = {this.authenticate} />
            </div>
        )
    }
}

export default App
