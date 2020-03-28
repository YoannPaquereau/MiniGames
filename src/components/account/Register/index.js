import React, {Component} from 'react';
import style from '../form.module.scss';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

class Register extends Component {

    onChange = event => {
        if (event.target.value === '') {
            event.target.classList.add(style.empty);
        }
        else if (event.target.classList.contains(style.empty)) {
            event.target.classList.remove(style.empty);
        }
    }

    render() {
        return (
            <div className={style.parent}>
                <div className={style.form}>
                    <form>
                        <header className={style.header}>
                            <h2>Inscription</h2>
                        </header>

                        <div className={style.row}>
                            <input type="text" id="username" required className={style.empty} onChange={this.onChange} />
                            <span>Nom d'utilisateur</span>
                        </div>

                        <div className={style.row}>
                            <input type="email" id="email" required className={style.empty} onChange={this.onChange} />
                            <span>Adresse mail</span>
                        </div>

                        <div className={style.row}>
                            <input type="password" id="passwordOne" required className={style.empty} onChange={this.onChange} />
                            <span>Mot de passe</span>
                        </div>

                        <div className={style.row}>
                            <input type="password" id="passwordTwo" required className={style.empty} onChange={this.onChange} />
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
                                <a href='#' className={style.google}><FontAwesomeIcon icon={faGoogle} /></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;