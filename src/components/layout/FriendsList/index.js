import React, { Component } from 'react'
import style from './friendsList.module.scss'
import { faUserFriends, faPlusCircle, faTimesCircle, faUserPlus, faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { addFriend, listUser, getUsersByIdList, acceptRequest } from "../../actions/friendActions"

import PropTypes from "prop-types"
import { connect } from "react-redux"

import Notification from './Notification/'

class FriendsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            searchFriend: '',
            listSearchFriend: [],
            friends: []
        };
        this.user = this.props.auth.user;
    }

    componentDidMount() {
        this.user.friends = this.user.friends.filter(function(e){return e});
        if (this.user.friends.length > 0) {
            this.props.getUsersByIdList({ usersTab: this.user.friends })
                .then(user => {
                    this.setState({ friends: user })
            })
        }
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

            const data = {
                username: this.state.searchFriend,
                userId: this.user.id,
            }

            this.props.listUser(data)
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

    addFriendRequest = idFriend => {
        this.props.addFriend(this.user.id, idFriend)
            .then(res => {
                    let el = document.getElementById('addFriendIcon-'+idFriend);
                    el.removeAttribute('onClick');
                    el.classList.remove(style.addFriendIcon);
                    el.classList.add(style.successSendRequest);
                    el.innerHTML = '✔';
            })
    }

    showFriendsList = event => {
        document.getElementById('friendsIcon').classList.add(style.selected);
        document.getElementById('notifsIcon').classList.remove(style.selected);

        document.getElementById('listFriends').style.display = 'block';
        document.getElementById('notification').style.display = 'none';
    }

    showNotification = event => {
        document.getElementById('friendsIcon').classList.remove(style.selected);
        document.getElementById('notifsIcon').classList.add(style.selected);


        document.getElementById('listFriends').style.display = 'none';
        document.getElementById('notification').style.display = 'block';
    }

    render() {
        return (
                <div className={style.parent}>
                    <div className={style.list}  id='friendsList'>
                        <div className={style.switchIcon}>
                            <h3 className={[style.friendsIcon, style.selected].join(' ')} id='friendsIcon' onClick={this.showFriendsList}><FontAwesomeIcon icon={faUserFriends} /></h3>
                            <h3 className={style.notifsIcon} id='notifsIcon' onClick={this.showNotification}><FontAwesomeIcon icon={faBell} /></h3>
                        </div>


                        <div className={style.friendsList} id='listFriends'>
                            <div className={style.toolbar}>
                                <span className={style.newFriend} onClick={this.showHideModal}>Ajouter un ami <FontAwesomeIcon icon={faPlusCircle} /></span>
                            </div>

                            <ul className={style.friends}>
                                { this.state.friends.map(item => (
                                    <div className={style.friend} key={item._id}>
                                        <li>
                                            {item.username}
                                        </li>
                                    </div>
                                ))}
                            </ul>
                        </div>

                        <div className={style.notification} id='notification'>
                            <Notification user={this.user} getUsersByIdList={this.props.getUsersByIdList} acceptRequest={this.props.acceptRequest } />
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
                                
                            <ul id='searchFriendList'>
                                { this.state.listSearchFriend.length === 0 && 
                                    <p>Pas de résultat</p>
                                }

                                { this.state.listSearchFriend.map(item => (
                                    <div className={style.friendListItems} key={item._id}>
                                        <li>
                                            <span className={style.usernameFriend}>{item.username}</span>
                                            { (this.user.friendsRequestSend.indexOf(item._id) === -1)
                                                ? <span className={style.addFriendIcon} id={"addFriendIcon-" + item._id} onClick={() => this.addFriendRequest(item._id)}><FontAwesomeIcon icon={faUserPlus} /></span>
                                                : <span className={style.successSendRequest}>✔</span>
                                            }
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
    getUsersByIdList: PropTypes.func.isRequired,
    acceptRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(
    mapStateToProps,
    { addFriend, listUser, getUsersByIdList, acceptRequest }
)(FriendsList);