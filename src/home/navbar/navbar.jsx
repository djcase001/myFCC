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
        this.state = {
            sidebar: false
        };
    }

    componentDidMount(){

    }

    manageSidebar(){
        var vm = this;
        this.setState({
            sidebar: !this.state.sidebar
        }, function(){
            if(vm.state.sidebar){
                vm.refs.sideBar.className = 'ui vertical inverted sidebar menu left icon visible' ;
                vm.refs.rail.hidden = true;
            }else{
                vm.refs.sideBar.className = 'ui vertical inverted sidebar menu left icon hidden' ;
                vm.refs.rail.hidden = false;
            }
        });
    }

    AjouterInfos(){
        this.props.AjouterInfos();
    }

    SignOut (){
        this.props.disconnect()
    }

    render() {

        return (
            <div>
            <div ref="rail" onClick={this.manageSidebar} className="ui black big launch right attached fixed button">
                <i className="content icon"></i>
                <span className="text">Menu</span>
            </div>

            <div   className="launch button fixed launch button custom-rail">
                    <div className="ui inverted segment">
                        <i className="sidebar icon"></i>
                    </div>
                </div>

                <div ref='sideBar' className="ui vertical inverted sidebar menu left icon">
                <a className="item">
                    <img className="custom-logo" src={logo} alt="logo"/>
                    SinAce
                </a>
                <a className="item">
                    {this.props.authedUser.nom}
                </a>
                <a className="item">
                    <i className="home icon"></i>
                    Accueil
                </a>
                <a onClick={this.AjouterInfos} className="item">
                    <i className="plus icon"></i>
                    Ajouter Infos
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
