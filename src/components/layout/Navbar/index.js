import React, {Component} from 'react';
import style from './navbar.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faGamepad } from "@fortawesome/free-solid-svg-icons";
import {BrowserRouter as Router, Link, Switch, Route} from "react-router-dom";
import Homepage from "../../Homepage";
import Login from "../../account/Login";
import Register from "../../account/Register";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";


class Navbar extends Component {

    logout = () => {
        this.props.logoutUser();
    }

    notAuth = (
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
    );

    isAuth = (
        <ul className={style.list} id='list'>
            <li>
                <Link to="/" className={style.links}>Accueil</Link>
            </li>
            <li>
                <Link to="#" className={style.links}>Mon compte</Link>
            </li>
            <li>
                <Link to="#" className={style.links}>Jeux</Link>
            </li>
            <li>
                <button className={style.links} onClick={this.logout}>Déconnexion</button>
            </li>
        </ul>
    );

    handleAuth = () => {
        if (this.props.auth.isAuthenticated) {
            this.list = this.isAuth;
        }
        else {
            this.list = this.notAuth;
        }
    }

    constructor(props) {
        super(props);
        this.handleAuth();
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.auth.isAuthenticated === nextProps.auth.isAuthenticated) return false;

        this.list = (nextProps.auth.isAuthenticated) ? this.isAuth : this.notAuth;
        return true;
    }

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
                    {this.list}
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

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Navbar);