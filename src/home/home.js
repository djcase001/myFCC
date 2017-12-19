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
        this.saveProfile = this.saveProfile.bind(this);
        this.state = {
            db: this.props.FIREBASE.database(),
            person: {},
            user: {},
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
                    vm.setState({
                        user: snap.val()
                    });
            });
        this.state.db.ref()
            .child('usersData')
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
                            (snap.val().budgetMax.salaire + snap.val().budgetMax.autresRevenus) * snap.val().budgetPreview.envies/100,
                            (snap.val().budgetMax.salaire + snap.val().budgetMax.autresRevenus) * snap.val().budgetPreview.besoins/100,
                            (snap.val().budgetMax.salaire + snap.val().budgetMax.autresRevenus) * snap.val().budgetPreview.epargnes/100],
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
                },
                options: {
                    legend: {
                        display: false
                    }
                }
            })
        });
    }

    componentWillMount(){

    }

    beautifyNumber(value){

        return value.toLocaleString('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    }

    ridOfEmpty (value){
        if(value === ''){
            return 0;
        }
        if(isNaN(value)){
            if(value.indexOf('.') !== -1 &&
               value.indexOf('.') === value.lastIndexOf('.') &&
               value.lastIndexOf('.') === value.length - 1
              ){

                return value;
            }
        }else{
            return parseFloat(value);
        }

    }

    saveBudget(event){
        event.preventDefault();

        const budget_max = {
            "salaire": this.ridOfEmpty(event.target[0].value),
            "impots": this.ridOfEmpty(event.target[1].value),
            "autresRevenus": this.ridOfEmpty(event.target[2].value)};
        const budget_min = {
            "loyer": this.ridOfEmpty(event.target[3].value),
            "amortPretBanc": this.ridOfEmpty(event.target[4].value),
            "amortAutresDettes": this.ridOfEmpty(event.target[5].value),
            "echeancesVehicule": this.ridOfEmpty(event.target[6].value),
            "depensesDomestiques": this.ridOfEmpty(event.target[7].value),
            "fraisScolaires": this.ridOfEmpty(event.target[8].value),
            "paiementAssurances": this.ridOfEmpty(event.target[9].value),
            "paiementCC": this.ridOfEmpty(event.target[10].value),
            "autresDepenses": this.ridOfEmpty(event.target[11].value)};
        const budget_preview = {
            "besoins": this.ridOfEmpty(event.target[12].value),
            "envies": this.ridOfEmpty(event.target[13].value),
            "epargnes": this.ridOfEmpty(event.target[14].value)
        }
        this.state.db.ref().child("usersData").child(this.props.USER.uid).child('budgetMax').set(budget_max);
        this.state.db.ref().child("usersData").child(this.props.USER.uid).child('budgetMin').set(budget_min);
        this.state.db.ref().child("usersData").child(this.props.USER.uid).child('budgetPreview').set(budget_preview);
        this.state.db.ref().child("usersData").child(this.props.USER.uid).child('comptesBancaires').set(this.state.person.comptesBancaires);
    }

    saveProfile(event){
        event.preventDefault();

        console.log(this.state.user);
        this.state.db.ref().child("users").child(this.props.USER.uid).set(this.state.user);
    }

    addInfos(what){
            if(what.target.dataset.check === 'profile'){
                if(this.refs.profile.className.indexOf('active') !== -1){
                    this.refs.profile.className = "ui modal custom-modal";
                }else{
                    this.refs.profile.className = "ui active modal custom-modal";
                }
            }else if(what.target.dataset.check === 'setting'){
                if(this.refs.ajout.className.indexOf('active') !== -1){
                    this.refs.ajout.className = "ui modal custom-modal";
                }else{
                    this.refs.ajout.className = "ui active modal custom-modal";
                }
            }else{
                this.refs.ajout.className = "ui modal custom-modal";
                this.refs.profile.className = "ui modal custom-modal";
            }
    }

    addAccount(){

        const accInfos = {
            nomBanque: this.refs.nomBanque.value,
            noCompte: this.refs.noCompte.value,
            balanceCompte: this.ridOfEmpty(this.refs.balanceCompte.value)
        };
        this.state.db.ref().child("users").child(this.props.USER.uid).child("data").child('comptesBancaires').push(accInfos);
    }

    handleAccounts (e){
        let comptesBancaires = this.state.person.comptesBancaires;
        let vm = this;
        const comptesValues = Object.values(comptesBancaires);
        const comptesKeys = Object.keys(comptesBancaires);


        let finalArr = comptesValues.map(function(val, id){
            if(e.target.placeholder === "Nom de la banque" && (comptesKeys[id] ===  e.target.dataset.key)){

                comptesBancaires[e.target.dataset.key].nomBanque = e.target.value;
                comptesBancaires[e.target.dataset.key].noCompte = val.noCompte;
                comptesBancaires[e.target.dataset.key].balanceCompte = vm.ridOfEmpty(val.balanceCompte);
            }else if(e.target.placeholder === "Numero du compte" && (comptesKeys[id] ===  e.target.dataset.key)){
                comptesBancaires[e.target.dataset.key].nomBanque = val.nomBanque;
                comptesBancaires[e.target.dataset.key].noCompte = e.target.value;
                comptesBancaires[e.target.dataset.key].balanceCompte = vm.ridOfEmpty(val.balanceCompte);
            }else if(e.target.placeholder === "Balance du compte" && (comptesKeys[id] ===  e.target.dataset.key)){
                comptesBancaires[e.target.dataset.key].nomBanque = val.nomBanque;
                comptesBancaires[e.target.dataset.key].noCompte = val.noCompte;
                comptesBancaires[e.target.dataset.key].balanceCompte = vm.ridOfEmpty(e.target.value);
            }
        });


        return comptesBancaires;

    }

    onChangeHandleProfile(e){
        this.setState({
            user: {
                nom: e.target.form[0].value,
                prenom: e.target.form[1].value,
                dob: e.target.form[2].value
            }
        });
    }

    onChangeHandle(e){
        console.dir(e.target);

            let comptesBancaires = this.handleAccounts(e);
            this.setState({
                person: {budgetMax :{
                            salaire: this.ridOfEmpty(e.target.form[0].value),
                            impots: this.ridOfEmpty(e.target.form[1].value),
                            autresRevenus: this.ridOfEmpty(e.target.form[2].value)
                        },
                        budgetMin : {
                            loyer : this.ridOfEmpty(e.target.form[3].value),
                            amortPretBanc : this.ridOfEmpty(e.target.form[4].value),
                            amortAutresDettes: this.ridOfEmpty(e.target.form[5].value),
                            echeancesVehicule:this.ridOfEmpty(e.target.form[6].value),
                            depensesDomestiques:this.ridOfEmpty(e.target.form[7].value),
                            fraisScolaires:this.ridOfEmpty(e.target.form[8].value),
                            paiementAssurances:this.ridOfEmpty(e.target.form[9].value),
                            paiementCC:this.ridOfEmpty(e.target.form[10].value),
                            autresDepenses:this.ridOfEmpty(e.target.form[11].value)
                        },
                        budgetPreview : {
                            besoins: this.ridOfEmpty(e.target.form[12].value),
                            envies: this.ridOfEmpty(e.target.form[13].value),
                            epargnes: this.ridOfEmpty(e.target.form[14].value)
                        },
                        comptesBancaires
                }
            });
    }

    SignOut (){
        const auth = this.props.FIREBASE.auth();
        auth.signOut();
    }

    render() {

        const user = this.state.user ? this.state.user : {};

        const budgetMax = this.state.person.budgetMax ? this.state.person.budgetMax : {};
        const budgetMin = this.state.person.budgetMin ? this.state.person.budgetMin : {};
        const budgetPreview = this.state.person.budgetPreview ? this.state.person.budgetPreview : {};

        const depensesLabels = Object.keys(budgetMin);
        const depensesValues = Object.values(budgetMin);
        let   totalDepenses = (depensesValues.length !== 0) ? depensesValues.reduce(function(a, b){
            return a + b;
        }) : [0, 0];
        const depenses = depensesLabels.map((val, id) => (<div className="item" key={id}>{val} <span>{this.beautifyNumber(depensesValues[id]) || 0}</span></div>))

        const revenusLabels = Object.keys(budgetMax);
        const revenusValues = Object.values(budgetMax);
        let   totalRevenus = budgetMax.salaire - budgetMax.impots + budgetMax.autresRevenus;
        const revenus = revenusLabels.map((val, id) => (<div className="item" key={id}>{val} <span>{this.beautifyNumber(revenusValues[id]) || 0}</span></div>));

        const accounts = this.state.person.comptesBancaires ? this.state.person.comptesBancaires : {};
        const accArr = Object.values(accounts);
        const keysArr = Object.keys(accounts);
        const account = accArr.map(function(val, id){
            return (<div className="fields">
                    <div className="field" key={id}>
                                <label>{val.nomBanque}</label>
                                <input type="text" data-no={id}  data-key={keysArr[id]} value={val.nomBanque} placeholder="Nom de la banque" />
                            </div>
                            <div className="field">
                                <label>{val.noCompte}</label>
                                <input type="text" data-no={id} data-key={keysArr[id]} value={val.noCompte} placeholder="Numero du compte" />
                            </div>
                            <div className="field">
                                <label>{val.balanceCompte}</label>
                                <input type="text" data-no={id} data-key={keysArr[id]} value={val.balanceCompte} placeholder="balance du compte" />
                            </div>
                        </div>);
        });


        return (
            <div>
                <NavBar disconnect={this.SignOut} authedUser={this.state.user}  AjouterInfos={this.addInfos} />


                    <div className="ui">
                        <div className="ui center aligned container">
                            <div className="ui grid">
                                <div className="eight wide phone eight wide tablet four wide computer column">
                                    <div className="ui statistic column custom-statistic custom-blue">
                                        <div className="value custom-white">
                                            {this.beautifyNumber(budgetMax.salaire - budgetMax.impots + budgetMax.autresRevenus)}
                                        </div>
                                        <div className="label custom-white">
                                            Salaire/Mensuel
                                        </div>
                                    </div>
                                </div>
                                <div className="eight wide phone eight wide tablet four wide computer column padded">
                                    <div className="ui statistic custom-statistic custom-red">
                                        <div className="value custom-white">
                                            {this.beautifyNumber((budgetMax.salaire + budgetMax.autresRevenus) * budgetPreview.envies/100)}
                                        </div>
                                        <div className="label custom-white">
                                            Envies/30%
                                        </div>
                                    </div>
                                </div>
                                <div className="eight wide phone eight wide tablet four wide computer column">
                                    <div className="ui statistic custom-statistic custom-violet">
                                        <div className="value custom-white">
                                            {this.beautifyNumber((budgetMax.salaire + budgetMax.autresRevenus) * budgetPreview.besoins/100)}
                                        </div>
                                        <div className="label custom-white">
                                            Besoins/50%
                                        </div>
                                    </div>
                                </div>
                                <div className="eight wide phone eight wide tablet four wide computer column">
                                    <div className="ui statistic custom-statistic custom-teal">
                                        <div className="value custom-white">
                                            {this.beautifyNumber((budgetMax.salaire + budgetMax.autresRevenus) * budgetPreview.epargnes/100)}
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
                        <div className="six wide column">
                            <div className="ui segment">
                                <div className="ui top attached custom-label"><h3 className="header">Dépenses Prévisionnelles</h3> </div>
                                <Pie data={this.state.previewData} options={this.state.options} />
                            </div>
                        </div>
                        <div className="six wide column">
                            <div className="ui segment">
                                <div className="ui top attached custom-label"><h3 className="header">Dépenses Réelles</h3></div>
                                <Pie data={this.state.realData} options={this.state.options} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ui container">
                    <div className="ui stackable grid">
                        <div className="six wide column">
                            <div className="ui segment">
                                <div className="ui top attached label"><h3 className="header">Revenus</h3> </div>
                                <div className="ui list divided custom-list">
                                    {revenus}
                                    <div className="item">Revenu Net<span>{this.beautifyNumber(totalRevenus) || 0}</span></div>
                                </div>
                            </div>
                        </div>
                        <div className="six wide column">
                            <div className="ui segment">
                                <div className="ui top attached label"><h3 className="header">Dépenses</h3> </div>
                                <div className="ui list divided custom-list">
                                    {depenses}
                                    <div className="item">Total Dépenses<span>{this.beautifyNumber(totalDepenses) || 0}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div ref="ajout" className="ui tiny long modal custom-modal">
                            <div className="header">Ajouter Infos</div>

                            <div className="image content">
                                <img src={logo} className="image custom-image"/>
                                <div className="description">
                                    <p>Formulaire de budget familial</p>
                                </div>
                            </div>
                            <div data-check="close" onClick={this.addInfos} className="custom-window-close">
                                <i data-check="close" className="window close icon"></i>
                            </div>
                            <div className="scrolling scroll-content content">
                                <div className="ui inverted segment">
                                    <div className="ui inverted large equal width form">
                                <form data-check="profile" onSubmit={this.saveBudget} onChange={(event)=> this.onChangeHandle(event)}>
                                    <div className="fields">
                                        <div className="field">
                                            <label>Salaire Mensuel</label>
                                            <input type="text" value={budgetMax.salaire}  placeholder="Salaire Mensuel" />
                                        </div>

                                        <div className="field">
                                            <label>Impots</label>
                                            <input type="text" value={budgetMax.impots} placeholder="Impots" />
                                        </div>

                                        <div className="field">
                                            <label>Autres Revenus</label>
                                            <input type="text" value={budgetMax.autresRevenus} placeholder="Autres Revenus" />
                                        </div>
                                    </div>

                                    <div className="ui divider"></div>

                                    <div className="fields">
                                        <div className="field">
                                            <label>Loyer</label>
                                            <input type="text" value={budgetMin.loyer} placeholder="Loyer" />
                                        </div>

                                        <div className="field">
                                            <label>Amortissement pret bancaire</label>
                                            <input type="text" value={budgetMin.amortPretBanc} placeholder="Amortissement pret bancaire" />
                                        </div>

                                        <div className="field">
                                            <label>Amortissement autres dettes</label>
                                            <input type="text" value={budgetMin.amortAutresDettes} placeholder="Amortissement autres dettes" />
                                        </div>
                                    </div>
                                    <div className="fields">
                                        <div className="field">
                                            <label>Echeances/Vehicules</label>
                                            <input type="text" value={budgetMin.echeancesVehicule} placeholder="Echeances/Vehicules"/>
                                        </div>

                                        <div className="field">
                                            <label>Depenses domestiques</label>
                                            <input type="text" value={budgetMin.depensesDomestiques} placeholder="Depenses domestiques"/>
                                        </div>

                                        <div className="field">
                                            <label>Frais Scolaire</label>
                                            <input type="text" value={budgetMin.fraisScolaires} placeholder="Frais Scolaire"/>
                                        </div>
                                    </div>
                                    <div className="fields">
                                        <div className="field">
                                            <label>Paiement assurances</label>
                                            <input type="text" value={budgetMin.paiementAssurances} placeholder="Paiement assurances" />
                                        </div>

                                        <div className="field">
                                            <label>Paiement carte de credit</label>
                                            <input type="text" value={budgetMin.paiementCC} placeholder="Paiement carte de credit" />
                                        </div>
                                        <div className="field">
                                            <label>Autres Depenses</label>
                                            <input type="text" value={budgetMin.autresDepenses} placeholder="Autres Depenses" />
                                        </div>
                                    </div>

                                    <div className="ui divider"></div>

                                    <div className="fields">
                                        <div className="field">
                                            <label>% Besoins</label>
                                            <input type="text" value={budgetPreview.besoins} placeholder="% Besoins" />
                                        </div>

                                        <div className="field">
                                            <label>% Envies</label>
                                            <input type="text" value={budgetPreview.envies} placeholder="% Envies" />
                                        </div>
                                        <div className="field">
                                            <label>% Epargne</label>
                                            <input type="text" value={budgetPreview.epargnes} placeholder="% Epargne"  />
                                        </div>
                                    </div>

                                    <div className="ui divider"></div>
                                    {account}
                                    <div className="fields">
                                        <div className="field">
                                            <label>Nom de la banque</label>
                                            <input type="text" ref="nomBanque" placeholder="Nom de la banque" />
                                        </div>

                                        <div className="field">
                                            <label>Numero du compte</label>
                                            <input type="text" ref="noCompte" placeholder="Numero du compte" />
                                        </div>

                                        <div className="field">
                                            <label>Balance</label>
                                            <input type="text" ref="balanceCompte"  placeholder="Balance du compte" />
                                        </div>
                                        <button className="ui button" onClick={this.addAccount.bind(this)} type="button">+</button>
                                    </div>




                                    <button className="ui button" type="submit">Sauvegarder</button>
                            </form>
                                </div>
                                </div>
                            </div>
                        </div>

                <div ref="profile" className="ui tiny long modal custom-modal">
                    <div className="header">Infos Profile</div>

                    <div className="image content">
                        <img src={logo} className="image custom-image"/>
                        <div className="description">
                            <p>Gestion des infos du profile</p>
                        </div>
                    </div>
                    <div data-check="close" onClick={this.addInfos} className="custom-window-close">
                        <i data-check="close" className="window close icon"></i>
                    </div>
                    <div className="scrolling scroll-content content">
                        <div className="ui inverted segment">
                            <div className="ui inverted large equal width form">
                                <form data-check="profile" onSubmit={this.saveProfile} onChange={(event)=> this.onChangeHandleProfile(event)}>
                                    <div className="fields">
                                        <div className="field">
                                            <label>Nom</label>
                                            <input type="text" value={user.nom}  placeholder="Nom" />
                                        </div>

                                        <div className="field">
                                            <label>Prenom</label>
                                            <input type="text" value={user.prenom} placeholder="Prenom" />
                                        </div>

                                        <div className="field">
                                            <label>Date de Naissance</label>
                                            <input type="date" value={user.dob} placeholder="Date de Naissance" />
                                        </div>
                                    </div>
                                    <button className="ui button" type="submit">Sauvegarder</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>





               </div>
        );
    }
}

export default Home;
