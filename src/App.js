import React, { Component } from 'react';
import * as firebase from 'firebase';
//import {Link} from 'react-router-dom';
import Home from './home/home';
import Auth from './auth/auth';
import './App.css';

const config = {
    apiKey: "AIzaSyCpVnVeaiX5Boo3Df4u8Ko7_wIOxFHaw2c",
    authDomain: "fin-perso.firebaseapp.com",
    databaseURL: "https://fin-perso.firebaseio.com",
    projectId: "fin-perso",
    storageBucket: "fin-perso.appspot.com",
    messagingSenderId: "751633041614"
};
firebase.initializeApp(config);

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            auth: false,
            errorMsg: null
        }
        this.isAuthenticated = this.isAuthenticated.bind(this);
    }

    componentDidMount(){
        const vm = this;
        const auth = firebase.auth();
        auth.onAuthStateChanged(function(user){
            if(user){
                console.log(user, 'user is logged in');
                vm.setState({
                    auth: user
                });
            }else{
                console.log("Not logged in");
                vm.setState({
                    auth: false
                });
            }
        });
    }

    isAuthenticated(user, mode){
        var vm = this;
        console.log("authed is injected", user);
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
                    db.ref().child('users').child(loggedUser.uid).set(user);
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
        var view = this.state.auth ? <Home USER={this.state.auth} FIREBASE={firebase} /> : <Auth errMessage={this.state.errorMsg} authed = {this.isAuthenticated} />
    return (
        <div>
        {view}
        </div>
        );
  }
}

export default App;
