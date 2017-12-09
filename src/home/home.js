import React, { Component } from 'react';
import {Link, BrowserRouter, Route} from 'react-router-dom';
import './home.css';
import logo from '../logo.png';
import paragraph from '../paragraph.png';
import media_paragraph from '../media-paragraph.png';

class Home extends Component {
    constructor(props){
        super(props);
        this.SignOut = this.SignOut.bind(this);
        console.log(this.props.USER.email);
    }

    SignOut (){
        const auth = this.props.FIREBASE.auth();
        auth.signOut();
    }

    render() {

        return (
            <div>
            <div className="ui fixed inverted menu">
                <div className="ui container">
                    <a href="#" className="header item">
                        <img className="logo" src={logo} alt="logo"/>
                        Project Name
                    </a>
                    <a href="#" className="item">Home</a>
                    <div className="ui simple dropdown item">
                        Dropdown <i className="dropdown icon"></i>
                        <div className="menu">
                            <a className="item" href="#">Link Item</a>
                            <a className="item" href="#">Link Item</a>
                            <div className="divider"></div>
                            <div className="header">Header Item</div>
                            <div className="item">
                                <i className="dropdown icon"></i>
                                Sub Menu
                                <div className="menu">
                                    <a className="item" href="#">Link Item</a>
                                    <a className="item" href="#">Link Item</a>
                                </div>
                            </div>
                            <a onClick={this.SignOut} className="item">Se Deconnecter</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="ui main text container">
                <h1 className="ui header">Semantic UI Fixed Template</h1>
                <p>This is a basic fixed menu template using fixed size containers.</p>
                <p>A text container is used for the main container, which is useful for single column layouts</p>
                <img className="wireframe" src={media_paragraph}/>
                <img className="wireframe" src={paragraph}/>
                <img className="wireframe" src={paragraph}/>
                <img className="wireframe" src={paragraph}/>
                <img className="wireframe" src={paragraph}/>
                <img className="wireframe" src={paragraph}/>
                <img className="wireframe" src={paragraph}/>
            </div>

            <div className="ui inverted vertical footer segment">
                <div className="ui center aligned container">
                    <div className="ui stackable inverted divided grid">
                        <div className="three wide column">
                            <h4 className="ui inverted header">Group 1</h4>
                            <div className="ui inverted link list">
                                <a href="#" className="item">Link One</a>
                                <a href="#" className="item">Link Two</a>
                                <a href="#" className="item">Link Three</a>
                                <a href="#" className="item">Link Four</a>
                            </div>
                        </div>
                        <div className="three wide column">
                            <h4 className="ui inverted header">Group 2</h4>
                            <div className="ui inverted link list">
                                <a href="#" className="item">Link One</a>
                                <a href="#" className="item">Link Two</a>
                                <a href="#" className="item">Link Three</a>
                                <a href="#" className="item">Link Four</a>
                            </div>
                        </div>
                        <div className="three wide column">
                            <h4 className="ui inverted header">Group 3</h4>
                            <div className="ui inverted link list">
                                <a href="#" className="item">Link One</a>
                                <a href="#" className="item">Link Two</a>
                                <a href="#" className="item">Link Three</a>
                                <a href="#" className="item">Link Four</a>
                            </div>
                        </div>
                        <div className="seven wide column">
                            <h4 className="ui inverted header">Footer Header</h4>
                                <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
                        </div>
                    </div>
                <div className="ui inverted section divider"></div>
                <img src={logo} className="ui centered mini image"/>
                <div className="ui horizontal inverted small divided link list">
                    <a className="item" href="#">Site Map</a>
                    <a className="item" href="#">Contact Us</a>
                    <a className="item" href="#">Terms and Conditions</a>
                    <a className="item" href="#">Privacy Policy</a>
                </div>
            </div>
            </div>
        </div>
        );
    }
}

export default Home;
