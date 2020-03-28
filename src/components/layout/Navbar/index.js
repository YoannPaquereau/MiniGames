import React, {Component} from 'react';
import style from './navbar.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faGamepad } from "@fortawesome/free-solid-svg-icons";
import {BrowserRouter as Router, Link, Switch, Route} from "react-router-dom";
import Homepage from "../../Homepage";
import Login from "../../account/Login";
import Register from "../../account/Register";

class Navbar extends Component {

    navbarToggle = () => {
        document.getElementById('list').classList.toggle(style.active);
    };

    render() {
        return (
            <Router>
                <div className={style.navbar}>
                    <span className={style.toggle} id="toggle" onClick={this.navbarToggle}>
                        <FontAwesomeIcon icon={faBars} />
                    </span>
                    <Link to="/" className={style.logo}><FontAwesomeIcon icon={faGamepad} /></Link>
                    <ul className={style.list} id='list'>
                        <li>
                            <Link to="/" className={style.links}>Accueil</Link>
                        </li>
                        <li>
                            <Link to="/login" className={style.links}>Connexion</Link>
                        </li>
                        <li>
                            <Link to="/register" className={style.links}>Inscription</Link>
                        </li>
                    </ul>
                </div>
                <Switch>
                    <Route exact path='/' component={Homepage}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/register' component={Register}/>
                </Switch>
            </Router>
        );
    }
}

export default Navbar;