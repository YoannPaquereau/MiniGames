import React, {Component} from 'react';
import style from '../form.module.scss';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    componentDidUpdate() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    onChange = event => {
        this.setState({ [event.target.id]: event.target.value });

        if (event.target.value === '') {
            event.target.classList.add(style.empty);
        }
        else if (event.target.classList.contains(style.empty)) {
            event.target.classList.remove(style.empty);
        }
    }

    onSubmit = event => {
        event.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.loginUser(userData);
    }

    render() {

        const { errors } = this.state;

        return (
            <div className={style.parent}>
                <div className={style.form}>
                    <form onSubmit={this.onSubmit}>
                        <header className={style.header}>
                            <h2>Connexion</h2>
                        </header>

                        <div className={style.row}>
                            <input 
                                type="email" 
                                id="email" 
                                required 
                                className={style.empty} 
                                onChange={this.onChange}
                                value={this.state.email}
                                error={errors.email} 
                            />
                            <span>Adresse mail</span>
                        </div>

                        <div className={style.row}>
                            <input 
                                type="password" 
                                id="password" 
                                required 
                                className={style.empty} 
                                onChange={this.onChange}
                                value={this.state.password}
                                error={errors.password}  
                            />
                            <span>Mot de passe</span>
                        </div>

                        <div className={style.row}>
                            <button type="submit">Se connecter</button>
                        </div>
                    </form>
                    <div className={style.socials}>
                        <header>
                            <h2>Connexion avec réseaux sociaux</h2>
                        </header>
                        <ul>
                            <li>
                                <button className={style.google}><FontAwesomeIcon icon={faGoogle} /></button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser }
)(Login);