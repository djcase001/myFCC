import React, { Component } from 'react';
import {Link, BrowserRouter, Route} from 'react-router-dom';
import {Line} from 'react-chartjs';
import NavBar from './navbar/navbar.jsx';
import './home.css';
import logo from '../logo.png';
import paragraph from '../paragraph.png';
import media_paragraph from '../media-paragraph.png';

const options = {"scales": {
    "yAxes": [{
        "ticks": {
            "beginAtZero":true
        }
    }]
}};

class Home extends Component {
    constructor(props){
        super(props);
        this.SignOut = this.SignOut.bind(this);
        this.addInfos = this.addInfos.bind(this);
        this.saveBudget = this.saveBudget.bind(this);
//        console.log(this.props.USER.email);
        this.state = {
            db: this.props.FIREBASE.database(),
            person: ''
        };
    }

    componentDidMount(){
        const vm = this;
        this.state.db.ref()
            .child('users')
            .child(this.props.USER.uid)
            .on('value',
                function(snap){
            console.log(snap.val());
            vm.setState({
                person : snap.val()
            })
        });
    }

    componentWillMount(){

    }

    ridOfEmpty (value){
        if(value === ''){
            return null;
        }else{
            return value;
        }
    }

    saveBudget(){

        const budget_max = {
            "salaire": this.ridOfEmpty(this.refs.salaireMensuel.value),
            "impots": this.ridOfEmpty(this.refs.impots.value),
            "autresRevenus": this.ridOfEmpty(this.refs.autresRevenus.value)};
        const budget_min = {
            "salaire": this.ridOfEmpty(this.refs.salaireMensuel.value),
            "impots": this.ridOfEmpty(this.refs.impots.value),
            "autresRevenus": this.ridOfEmpty(this.refs.autresRevenus.value),
            "loyer": this.ridOfEmpty(this.refs.loyer.value),
            "amortPretBanc": this.ridOfEmpty(this.refs.amortPretBanc.value),
            "amortAutresDettes": this.ridOfEmpty(this.refs.amortAutresDettes.value),
            "echeancesVehicule": this.ridOfEmpty(this.refs.echeancesVehic.value),
            "depensesDomestiques": this.ridOfEmpty(this.refs.depensesDom.value),
            "fraisScolaires": this.ridOfEmpty(this.refs.fraisScol.value),
            "paiementAssurances": this.ridOfEmpty(this.refs.paiementAss.value),
            "paiementCC": this.ridOfEmpty(this.refs.paiementCC.value),
            "autresDepenses": this.ridOfEmpty(this.refs.autresDepenses.value)};
        console.log(budget_max);
        this.state.db.ref().child("users").child(this.props.USER.uid).child('budgetMax').set(budget_max);
        this.state.db.ref().child("users").child(this.props.USER.uid).child('budgetMin').set(budget_min);
    }

    addInfos(){
        if(this.refs.ajout.className.indexOf('active') !== -1){
            this.refs.ajout.className = "ui modal custom-modal";
        }else{
            this.refs.ajout.className = "ui active modal custom-modal";
        }
    }

    SignOut (){
        const auth = this.props.FIREBASE.auth();
        auth.signOut();
    }

    render() {

        const budgetMax = this.state.person.budgetMax ? this.state.person.budgetMax : {};
        const budgetMin = this.state.person.budgetMin ? this.state.person.budgetMin : {};
        const budgetPreview = this.state.person.budgetPreview ? this.state.person.budgetPreview : {};
        return (
            <div>
            <NavBar disconnect={this.SignOut} authedUser={this.state.person}  AjouterInfos={this.addInfos} />


                    <div className="ui">
                        <div className="ui center aligned container">
                            <div className="ui stackable grid">
                                <div className="four wide column">
                                    <div className="ui statistic column custom-statistic custom-blue">
                                        <div className="value">
            {parseInt(budgetMax.salaire) + parseInt(budgetMax.autresRevenus)}
                                        </div>
                                        <div className="label">
                                            Salaire/Mensuel
                                        </div>
                                    </div>
                                </div>
                                <div className="four wide column padded">
                                    <div className="ui statistic custom-statistic custom-red">
                                        <div className="value">
                                            {(parseInt(budgetMax.salaire) + parseInt(budgetMax.autresRevenus)) * budgetPreview[3]/100}
                                        </div>
                                        <div className="label">
                                            Envies/30%
                                        </div>
                                    </div>
                                </div>
                                <div className="four wide column">
                                    <div className="ui statistic custom-statistic custom-violet">
                                        <div className="value">
                                            {(parseInt(budgetMax.salaire) + parseInt(budgetMax.autresRevenus)) * budgetPreview[1]/100}
                                        </div>
                                        <div className="label">
                                            Besoins/50%
                                        </div>
                                    </div>
                                </div>
                                <div className="four wide column">
                                    <div className="ui statistic custom-statistic custom-teal">
                                        <div className="value">
                                            {(parseInt(budgetMax.salaire) + parseInt(budgetMax.autresRevenus)) * budgetPreview[2]/100}
                                        </div>
                                        <div className="label">
                                            Epargne/20%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



            <Line data={[50, 42, 68, 72, 58]} options={options}  width="600" height="250"/>



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

                        <div ref="ajout" className="ui tiny long modal custom-modal">
                            <div className="header">Ajouter Infos</div>

                            <div className="image content">
                                <img src={logo} className="image custom-image"/>
                                <div className="description">
                                    <p>Formulaire de budget familial</p>
                                </div>
                            </div>
                            <div onClick={this.addInfos} className="custom-window-close">
                                <i className="window close icon"></i>
                            </div>
                            <div className="scrolling scroll-content content">
                                <div className="ui inverted segment">
                                <div className="ui inverted large form">

                                    <div className="fields">
                                        <div className="field">
                                            <label>Salaire Mensuel</label>
                                            <input type="text" placeholder="Salaire Mensuel" ref="salaireMensuel"/>
                                        </div>
                                    </div>
                                    <div className="fields">
                                        <div className="field">
                                            <label>Impots</label>
                                            <input type="text" placeholder="Impots" ref="impots"/>
                                        </div>
                                    </div>
                                    <div className="fields">
                                        <div className="field">
                                            <label>Autres Revenus</label>
                                            <input type="text" placeholder="Autres Revenus" ref="autresRevenus"/>
                                        </div>
                                    </div>
                                    <div className="ui divider"></div>

                                    <div className="fields">
                                        <div className="field">
                                            <label>Loyer</label>
                                            <input type="text" placeholder="Loyer" ref="loyer"/>
                                        </div>
                                    </div>
                                    <div className="fields">
                                        <div className="field">
                                            <label>Amortissement pret bancaire</label>
                                            <input type="text" placeholder="Amortissement pret bancaire" ref="amortPretBanc" />
                                        </div>
                                    </div>
                                    <div className="fields">
                                        <div className="field">
                                            <label>Amortissement autres dettes</label>
                                            <input type="text" placeholder="Amortissement autres dettes" ref="amortAutresDettes" />
                                        </div>
                                    </div>

                                    <div className="fields">
                                        <div className="field">
                                            <label>Echeances/Vehicules</label>
                                            <input type="text" placeholder="Echeances/Vehicules" ref="echeancesVehic"/>
                                        </div>
                                    </div>
                                    <div className="fields">
                                        <div className="field">
                                            <label>Depenses domestiques</label>
                                            <input type="text" placeholder="Depenses domestiques" ref="depensesDom"/>
                                        </div>
                                    </div>
                                    <div className="fields">
                                        <div className="field">
                                            <label>Frais Scolaire</label>
                                            <input type="text" placeholder="Frais Scolaire" ref="fraisScol"/>
                                        </div>
                                    </div><div className="fields">
                                        <div className="field">
                                            <label>Paiement assurances</label>
                                            <input type="text" placeholder="Paiement assurances" ref="paiementAss" />
                                        </div>
                                    </div>
                                    <div className="fields">
                                        <div className="field">
                                            <label>Paiement carte de credit</label>
                                            <input type="text" placeholder="Paiement carte de credit" ref="paiementCC" />
                                        </div>
                                    </div>
                                    <div className="fields">
                                        <div className="field">
                                            <label>Autres Depenses</label>
                                            <input type="text" placeholder="Autres Depenses" ref="autresDepenses" />
                                        </div>
                                    </div>

                                    <button onClick={this.saveBudget} className="ui button" type="submit">Sauvegarder</button>

                                </div>
                                </div>
                            </div>
                        </div>

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
