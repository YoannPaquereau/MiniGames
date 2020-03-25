import React, {Component} from 'react';
import style from './navbar.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

class Navbar extends Component {

    navbarToggle = () => {
        console.log('ok');
        document.getElementById('list').classList.toggle(style.active);
    };

    render() {
        return (
            <div className={style.navbar}>
                <span className={style.toggle} id="toggle" onClick={this.navbarToggle}>
                    <FontAwesomeIcon icon={faBars} />
                </span>
                <a href='#' className={style.logo}>Logo</a>
                <ul className={style.list} id='list'>
                    <li>
                        <a href='#' className={style.links}>Accueil</a>
                    </li>
                    <li>
                        <a href='#' className={style.links}>Connexion</a>
                    </li>
                    <li>
                        <a href='#' className={style.links}>Inscription</a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Navbar;