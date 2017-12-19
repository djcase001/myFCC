import React, { Component } from 'react';
import {Link, BrowserRouter, Route} from 'react-router-dom';
import '../home.css';
import logo from '../../logo.png';

class NavBar extends Component {
    constructor(props){
        super(props);
        this.SignOut = this.SignOut.bind(this);
        this.AjouterInfos = this.AjouterInfos.bind(this);
        this.manageSidebar = this.manageSidebar.bind(this);
        this.calculateAge = this.calculateAge.bind(this);

        this.state = {
            sidebar: false
        };
    }

    componentDidMount(){}

    calculateAge(){
        let age = this.props.authedUser ? this.props.authedUser.dob : {};
        let thisYear = new Date().getFullYear();

        age = new Date(age).getFullYear();
        age = thisYear - age;
        return age;
    }

    manageSidebar(){
        var vm = this;
        this.setState({
            sidebar: !this.state.sidebar
        }, function(){
            if(vm.state.sidebar){
                vm.refs.sideBar.className = 'ui vertical inverted custom-sidebar sidebar menu left demo labeled icon visible' ;
                vm.refs.rail.hidden = true;
            }else{
                vm.refs.sideBar.className = 'ui vertical inverted custom-sidebar sidebar menu left demo labeled icon hidden' ;
                vm.refs.rail.hidden = false;
            }
        });
    }

    AjouterInfos(event){
        this.props.AjouterInfos(event);
    }

    SignOut (){
        this.props.disconnect()
    }

    render() {

        return (
            <div>


                <div ref="rail" onClick={this.manageSidebar}  className="custom-rail">
                    <div className="ui inverted segment">
                        <i className="sidebar icon"></i>
                    </div>
                </div>

                <div ref='sideBar' className="ui vertical inverted sidebar custom-sidebar menu left demo labeled icon">
                <a className="item">
                    <img className="custom-logo" src={logo} alt="logo"/>
                    SinAce
                </a>
                <a className="item">
                    <i className="user icon"></i>
                    <div className="infos">Nom : <span>{this.props.authedUser.nom}</span></div>
                    <div className="infos">Prenom : <span>{this.props.authedUser.prenom}</span></div>
                    <div className="infos">Age : <span>{this.calculateAge} ans</span></div>
                </a>
                <a data-check="profile" onClick={this.AjouterInfos} className="item">
                    <i data-check="profile" className="home icon"></i>
                    Profil
                </a>
                <a data-check="setting" onClick={this.AjouterInfos} className="item">
                    <i data-check="setting" className="setting icon"></i>
                    Paramètres
                </a>
                <a className="item">
                    <i className="smile icon"></i>
                    Amis
                </a>
                <a onClick={this.manageSidebar} className="item">
                    <i className="close icon"></i>
                    Fermer
                </a>
                <a onClick={this.SignOut} className="item custom-link">
                    <i className="sign out icon"></i>
                    Se Deconnecter
                </a>
            </div>
        </div>
        );
    }
}

export default NavBar;
