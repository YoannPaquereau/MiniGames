import React, { Component } from 'react'
import style from './friendsList.module.scss'
import { faUserFriends, faPlusCircle, faSearch, faTimesCircle, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { addFriend, listUser } from "../../actions/friendActions"

import PropTypes from "prop-types";
import { connect } from "react-redux";

class FriendsList extends Component {

    constructor() {
        super();
        this.state = {
            show: false,
            searchFriend: '',
            listSearchFriend: []
        };
    }

    checked = event => {

        if (event.target.checked) {
            document.getElementById('friendsList').style.display = 'block';
            this.setState({ show: true })
        }
        else {
            document.getElementById('friendsList').style.display = 'none';
            this.setState({ show: false })
        }
    }

    showHideModal = () => {
        let modal = document.getElementById('modal')
        modal.classList.toggle(style.showModal);
    }

    handleKeyUp = () => {
        if (this.state.searchFriend.length > 2) {
            this.props.listUser(this.state.searchFriend)
            .then(res => {
                const users = res;
                this.setState({listSearchFriend: users});
            })
            document.getElementById('searchFriendList').style.display = 'block';
        }
    }

    onChange = event => {
        this.setState({ [event.target.id]: event.target.value });
    }

    render() {
        return (
                <div className={style.parent}>
                    <div className={style.list}  id='friendsList'>
                        <div className={style.friendsList}>
                            <h3>Amis</h3>
                            <div className={style.toolbar}>
                                <form>
                                    <input type='text' className={style.searchInput} placeholder='Rechercher un ami' />
                                    <button><FontAwesomeIcon icon={faSearch} /></button>
                                    <span className={style.newFriend} onClick={this.showHideModal}><FontAwesomeIcon icon={faPlusCircle} /></span>
                                </form>
                            </div>
                        </div>
                    </div>

                    <label className={style.show}>
                        <input type='checkbox' onChange={this.checked} />
                        <span className={style.icon} id='icon'>
                            <FontAwesomeIcon icon={ this.state.show ? faTimesCircle : faUserFriends} />
                        </span>
                    </label>

                    <div className={style.modal} id='modal'>

                        <div className={style.modalContent}>
                            <span className={style.close} onClick={this.showHideModal}><FontAwesomeIcon icon={faTimesCircle} /></span>
                            <h3>Ajouter un ami</h3>

                            <form>
                                <input 
                                    type='text'
                                    className={style.searchInput}
                                    placeholder='Rechercher un ami'
                                    onKeyUp={this.handleKeyUp}
                                    value={this.state.searchFriend}
                                    onChange={this.onChange}
                                    id='searchFriend'
                                    autoComplete='off'
                                />
                                <button><FontAwesomeIcon icon={faSearch} /></button>
                            </form>
                            <ul id='searchFriendList'>
                                {this.state.listSearchFriend.map(user => (
                                    <div className={style.friendListItems} key={user._id}>
                                        <li>
                                            <span className={style.usernameFriend}>{user.username}</span>
                                            <span className={style.addFriendIcon}><FontAwesomeIcon icon={faUserPlus} /></span>
                                        </li>
                                    </div>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
        )
    }
}

FriendsList.propTypes = {
    addFriend: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    listUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(
    mapStateToProps,
    { addFriend, listUser }
)(FriendsList);