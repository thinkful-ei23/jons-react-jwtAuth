import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchProtectedData} from '../actions/protected-data';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            warningTime: 1000 * 5,
            mainTime: 1000 * 10,
        };
    }

    setTimeOut() {
        this.warnTimeout = setTimeout(this.warn, this.state.warningTime);
        this.logoutTimeout = setTimeout(this.logout, this.state.mainTime);
    }
    
    clearTimeoutFunc = () => {
        if (this.warnTimeout) {
            clearTimeout(this.warnTimeout)
        }
        if (this.logoutTimeout) {
            clearTimeout(this.logoutTimeout)
        }
    };
    
    resetTimeout = () => {
        this.clearTimeoutFunc();
        this.setTimeout();
    };

    warn(){
        window.alert("You will be logged out automatically in 1 minute")
        console.log('You will be logged out automatically in 1 minute.');
    };

    componentDidMount() {
        this.props.dispatch(fetchProtectedData());
        this.signOutTime = setTimeout(() => {
            this.props.dispatch(clearAuth());
            clearAuthToken();
        }, this.state.mainTime);
    }
    componentWillUnmount = () => {
        clearTimeout(this.state.mainTime);
    }



    render() {
        return (
            <div className="dashboard">
                <div className="dashboard-username">
                    Username: {this.props.username}
                </div>
                <div className="dashboard-name">Name: {this.props.name}</div>
                <div className="dashboard-protected-data">
                    Protected data: {this.props.protectedData}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        protectedData: state.protectedData.data
    };
};

// ***** explain this line
export default requiresLogin()(connect(mapStateToProps)(Dashboard));
// function()();