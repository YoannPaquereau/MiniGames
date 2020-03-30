import React, {Component} from 'react';
import style from '../form.module.scss';

import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

class Register extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            email: '',
            passwordOne: '',
            passwordTwo: '',
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        console.log(nextProps.errors);
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

        const newUser = {
            username: this.state.username,
            email: this.state.email,
            passwordOne: this.state.passwordOne,
            passwordTwo: this.state.passwordTwo
        };

        this.props.registerUser(newUser, this.props.history);
    }

    render() {
        const { errors } = this.state;

        return (
            <div className={style.parent}>
                <div className={style.form}>
                    <form onSubmit={this.onSubmit}>
                        <header className={style.header}>
                            <h2>Inscription</h2>
                        </header>

                        <div className={style.row}>
                            <input 
                                type="text" 
                                id="username" 
                                required 
                                className={style.empty} 
                                onChange={this.onChange}
                                value={this.state.username}
                                error={errors.username}
                            />
                            <span>Nom d'utilisateur</span>
                        </div>

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
                                id="passwordOne" 
                                required 
                                className={style.empty} 
                                onChange={this.onChange}
                                value={this.state.passwordOne}
                                error={errors.passwordOne}
                            />
                            <span>Mot de passe</span>
                        </div>

                        <div className={style.row}>
                            <input 
                                type="password" 
                                id="passwordTwo" 
                                required 
                                className={style.empty} 
                                onChange={this.onChange} 
                                value={this.state.passwordTwo}
                                error={errors.passwordTwo}
                            />
                            <span>Répéter le mot de passe</span>
                        </div>

                        <div className={style.row}>
                            <button type="submit">S'inscrire</button>
                        </div>
                    </form>
                    <div className={style.socials}>
                        <header>
                            <h2>Inscription avec réseaux sociaux</h2>
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

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser }
) (withRouter(Register));