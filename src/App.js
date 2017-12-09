import React, { Component } from 'react';
import * as firebase from 'firebase';
//import {Link} from 'react-router-dom';
import Home from './home/home';
import Auth from './auth/auth';

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
            auth: false
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
        console.log("authed is injected", user);
        const auth = firebase.auth();
        if(mode === 'login'){
            const promise = auth.signInWithEmailAndPassword(user.email, user.password);
            promise.catch(e => console.log(e.message));
        }
        if(mode === 'signup'){
            const promise = auth.createUserWithEmailAndPassword(user.email, user.password);
            promise.catch(e => console.log(e.message));
        }

    }

    render() {
        var view = this.state.auth ? <Home USER={this.state.auth} FIREBASE={firebase} /> : <Auth authed = {this.isAuthenticated} />
    return (
        <div className="container">
        {view}
        </div>
        );
  }
}

export default App;
