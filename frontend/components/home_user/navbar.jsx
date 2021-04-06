import React from 'react';
import { logout } from '../../actions/session_actions';
import { toggleSidebar } from '../../actions/ui_actions';
import { Link } from 'react-router-dom';
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
      <nav className='userNav'>
        <Link to='/'><img src='assets/logo.png' alt="the word 'align' in white lettering on a purple background" width='74'/></Link>
        <ul>
          <a href='https://github.com/Eruanne2'>Github</a>
          <a href='www.linkedin.com/in/charis-ginn-9abb93173'>LinkedIn</a>
          <p>CV</p>
        </ul>
      </nav>
    ); 
    return(
      <div>
        <nav className='userNav'>
          <p>Logo</p>
          <p>Accounts dropdown</p>
          <p>Open an Account</p>
          <button onClick={this.openSidebar.bind(this)}>Profile and Settings</button>
          <button onClick={this.handleLogout.bind(this)}>Log Out</button>
        </nav>
        <SettingsSidebar/>
      </div>
    );
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);