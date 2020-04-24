import React, { Component } from 'react'
import { faBell, faClock, faUserPlus, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import style from './notification.module.scss'


class Notification extends Component {

    constructor(props) {
        super(props);
        this.state = {
            friendsRequestReceive: [],
            friendsRequestSend: []
        }
    }

    componentDidMount() {
        this.getUsersByID(this.props.user.friendsRequestSend, 'friendsRequestSend');
        this.getUsersByID(this.props.user.friendsRequest, 'friendsRequestReceive');
    }

    getUsersByID = (listUser, stateName) => {
        this.props.getUsersByIdList({ usersTab: listUser })
            .then(user => {
                this.setState({ [stateName]: user })
        })
    }

    render() {
        return (
            <div className={style.notification}>
                <h3><FontAwesomeIcon icon={faBell} /></h3>

                <ul className={style.friendsRequestReceive}>
                    { this.state.friendsRequestReceive.map(item => (
                        <li className={style.item} key={item._id}>
                            <span className={style.notifType}><FontAwesomeIcon icon={faUserPlus} /></span>
                            <span>{item.username}</span>
                            <div className={style.action}>
                                <span className={style.check}><FontAwesomeIcon icon={faCheck} /></span>
                                <span className={style.cross}><FontAwesomeIcon icon={faTimes} /></span>
                            </div>
                        </li>
                    ))}
                </ul>

                <ul className={style.friendsRequestSend}>
                    { this.state.friendsRequestSend.map(item => (
                        <li className={style.item} key={item._id}>
                            <span className={style.notifType}><FontAwesomeIcon icon={faUserPlus} /></span>
                            <span>{item.username}</span>
                            <span className={style.action}><FontAwesomeIcon icon={faClock} /></span>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Notification
