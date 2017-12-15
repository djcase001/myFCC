import React, { Component } from 'react';
import {Link, BrowserRouter, Route} from 'react-router-dom';
import NavBar from './navbar/navbar.jsx';
import {Pie} from 'react-chartjs-2';
import './home.css';
import logo from '../logo.png';
import paragraph from '../paragraph.png';
import media_paragraph from '../media-paragraph.png';


class Home extends Component {
    constructor(props){
        super(props);
        this.SignOut = this.SignOut.bind(this);
        this.addInfos = this.addInfos.bind(this);
        this.saveBudget = this.saveBudget.bind(this);
        this.state = {
            db: this.props.FIREBASE.database(),
            person: '',
            chartData:{}
        }
    }


    componentDidMount(){
        const vm = this;
        this.state.db.ref()
            .child('users')
            .child(this.props.USER.uid)
            .on('value',
                function(snap){
            console.log(snap.val().budgetMax.salaire + snap.val().budgetMax.autresRevenus - Object.values(snap.val().budgetMin).reduce((a, b) => a+b));
            const totalDepense = Object.values(snap.val().budgetMin).reduce((a, b) => a+b);
            vm.setState({
                person : snap.val(),
                previewData: {
                    labels: ['Envies', 'Besoins', 'Epargne'],
                    datasets:[{
                        label:'Budget',
                        data:[
                            (snap.val().budgetMax.salaire + snap.val().budgetMax.autresRevenus) * snap.val().budgetPreview[2]/100,
                            (snap.val().budgetMax.salaire + snap.val().budgetMax.autresRevenus) * snap.val().budgetPreview[0]/100,
                            (snap.val().budgetMax.salaire + snap.val().budgetMax.autresRevenus) * snap.val().budgetPreview[1]/100],
                        backgroundColor:[
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)']
                    }]
                },
                realData: {
                    labels: ['Epargne', 'Loyer', 'Amort Pret Banc',
                             'Amort Autres Dettes',
                             'Echeances/Vehic',
                             'Depenses Dom',
                             'Frais Scol',
                             'Pmt Ass',
                             'Pmt CC',
                             'Autres Dep'],
                    datasets:[{
                        label:'Budget',
                        data:[
                            snap.val().budgetMax.salaire + snap.val().budgetMax.autresRevenus - snap.val().budgetMax.impots - totalDepense,
                            snap.val().budgetMin.loyer,
                            snap.val().budgetMin.amortPretBanc,
                            snap.val().budgetMin.amortAutresDettes,
                            snap.val().budgetMin.echeancesVehicule,
                            snap.val().budgetMin.depensesDomestiques,
                            snap.val().budgetMin.fraisScolaires,
                            snap.val().budgetMin.paiementAssurances,
                            snap.val().budgetMin.paiementCC,
                            snap.val().budgetMin.autresDepenses
                        ],
                        backgroundColor:[
                            'rgba(151, 18, 75, 0.6)',
                            'rgba(11, 64, 156, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(194, 56, 181, 0.6)',
                            'rgba(0, 184, 192, 0.6)',
                            'rgba(255, 199, 127, 0.6)',
                            'rgba(176, 117, 124, 0.6)',
                            'rgba(98, 96, 96, 0.6)',
                            'rgba(4, 67, 67, 0.6)',
                            'rgba(73, 190, 183, 0.6)'
                        ]
                    }]
                }
            })
        });
    }

    componentWillMount(){

    }

    ridOfEmpty (value){
        if(value === ''){
            return null;
        }else{
            return parseInt(value);
        }
    }

    saveBudget(){

        const budget_max = {
            "salaire": this.ridOfEmpty(this.refs.salaireMensuel.value),
            "impots": this.ridOfEmpty(this.refs.impots.value),
            "autresRevenus": this.ridOfEmpty(this.refs.autresRevenus.value)};
        const budget_min = {
            "loyer": this.ridOfEmpty(this.refs.loyer.value),
            "amortPretBanc": this.ridOfEmpty(this.refs.amortPretBanc.value),
            "amortAutresDettes": this.ridOfEmpty(this.refs.amortAutresDettes.value),
            "echeancesVehicule": this.ridOfEmpty(this.refs.echeancesVehic.value),
            "depensesDomestiques": this.ridOfEmpty(this.refs.depensesDom.value),
            "fraisScolaires": this.ridOfEmpty(this.refs.fraisScol.value),
            "paiementAssurances": this.ridOfEmpty(this.refs.paiementAss.value),
            "paiementCC": this.ridOfEmpty(this.refs.paiementCC.value),
            "autresDepenses": this.ridOfEmpty(this.refs.autresDepenses.value)};

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
        const labels = Object.keys(budgetMin);
        const values = Object.values(budgetMin);
        const depenses = labels.map((val, id) => (<div className="item">{val} <span>{(values[id]).toLocaleString('fr-FR', {}) || 0}</span></div>))

        const revenusLabels = Object.keys(budgetMax);
        const revenusValues = Object.values(budgetMax);
        const revenus = revenusLabels.map((val, id) => (<div className="item">{val} <span>{(revenusValues[id]).toLocaleString('fr-FR', {}) || 0}</span></div>))

        return (
            <div>
            <NavBar disconnect={this.SignOut} authedUser={this.state.person}  AjouterInfos={this.addInfos} />


                    <div className="ui">
                        <div className="ui center aligned container">
                            <div className="ui grid">
                                <div className="eight wide phone eight wide tablet four wide computer column">
                                    <div className="ui statistic column custom-statistic custom-blue">
                                        <div className="value custom-white">
                                            {(budgetMax.salaire + budgetMax.autresRevenus).toLocaleString('fr-FR', {})}
                                        </div>
                                        <div className="label custom-white">
                                            Salaire/Mensuel
                                        </div>
                                    </div>
                                </div>
                                <div className="eight wide phone eight wide tablet four wide computer column padded">
                                    <div className="ui statistic custom-statistic custom-red">
                                        <div className="value custom-white">
                                            {((budgetMax.salaire + budgetMax.autresRevenus) * budgetPreview[2]/100).toLocaleString('fr-FR', {})}
                                        </div>
                                        <div className="label custom-white">
                                            Envies/30%
                                        </div>
                                    </div>
                                </div>
                                <div className="eight wide phone eight wide tablet four wide computer column">
                                    <div className="ui statistic custom-statistic custom-violet">
                                        <div className="value custom-white">
                                            {((budgetMax.salaire + budgetMax.autresRevenus) * budgetPreview[0]/100).toLocaleString('fr-FR', {})}
                                        </div>
                                        <div className="label custom-white">
                                            Besoins/50%
                                        </div>
                                    </div>
                                </div>
                                <div className="eight wide phone eight wide tablet four wide computer column">
                                    <div className="ui statistic custom-statistic custom-teal">
                                        <div className="value custom-white">
                                            {((budgetMax.salaire + budgetMax.autresRevenus) * budgetPreview[1]/100).toLocaleString('fr-FR', {})}
                                        </div>
                                        <div className="label custom-white">
                                            Epargne/20%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                <div className="ui center aligned container">
                    <div className="ui stackable grid">
                        <div className="eight wide column">
                            <Pie data={this.state.previewData} options={{}} />
                        </div>
                        <div className="eight wide column">
                            <Pie data={this.state.realData} options={{maintainAspectRatio: true}} />
                        </div>
                    </div>
                </div>

                <div className="ui container">
                    <div className="ui stackable grid">
                        <div className="six wide column">
                            <div className="ui segment">
                                <div className="ui top attached label"><h3 className="header">Revenus</h3> </div>
                                <div className="ui list custom-list">
                                    {revenus}
                                </div>
                            </div>
                        </div>
                        <div className="six wide column">
                            <div className="ui segment">
                                <div className="ui top attached label"><h3 className="header">Depenses</h3> </div>
                                <div className="ui list custom-list">
                                    {depenses}
                                </div>
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
