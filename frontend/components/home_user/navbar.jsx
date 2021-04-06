import React from 'react';
import { logout } from '../../actions/session_actions';
import { toggleSidebar } from '../../actions/ui_actions';
import SettingsSidebar from './settings_sidebar';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { currentUser: state.session.id }
};

const mapDispatchToProps = dispatch => {
  return { 
    logout: () => dispatch(logout()),
    toggleSidebar: () => dispatch(toggleSidebar())
  };
};


class Navbar extends React.Component{

  openSidebar(e){
    e.preventDefault();
    this.props.toggleSidebar();
  };

  handleLogout(e){
    e.preventDefault();
    this.props.logout();
  }

  render(){
    if (!this.props.currentUser) return(
      <div>
        <p>Logo</p>
        <p>github</p>
        <p>linkedin</p>
        <p>etc</p>
      </div>
    );
    return(
      <div>
        <p>Logo</p>
        <p>Accounts dropdown</p>
        <p>Open an Account</p>
        <button onClick={this.openSidebar.bind(this)}>Profile and Settings</button>
        <SettingsSidebar/>
        <button onClick={this.handleLogout.bind(this)}>Log Out</button>
      </div>
    );
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);