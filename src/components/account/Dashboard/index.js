import React, { Component } from 'react'
import style from './dashboard.module.scss'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Dashboard extends Component {
    render() {

        const { user } = this.props.auth;
        return (
            <div className={style.card}>
                <div className={style.container}>
                    <h4>{user.username}</h4>
                    <p>{user.email}</p>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps
  )(Dashboard);