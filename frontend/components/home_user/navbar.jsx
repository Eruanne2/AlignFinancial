import React from 'react';
import { logout } from '../../actions/session_actions';
import { toggleSidebar } from '../../actions/ui_actions';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { currentUser: state.session.id, sidebarOpen: state.ui.sidebar }
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
    if (this.props.sidebarOpen) {
      document.querySelector('.sidebar').classList.add('close-sidebar-animate');
      setTimeout(this.props.toggleSidebar, 300);
    } else this.props.toggleSidebar();
  };

  handleLogout(e){
    e.preventDefault();
    this.props.logout();
    this.props.history.push('/')
  }

  render(){
    if (!this.props.currentUser) return(
      <nav className='user-nav'>
        <Link to='/'><img src={window.logoURL} alt="the word 'align' in white lettering on a purple background" width='74'/></Link>
        <ul className='right-nav'>
          <a href='https://github.com/Eruanne2'>Github</a>
          <a href='https://www.linkedin.com/in/charis-ginn-9abb93173'>LinkedIn</a>
          <p>CV</p>
        </ul>
      </nav>
    ); 

    return(
      <div>
        <nav className='user-nav'>
          <ul className='left-nav'>
            <Link to='/'><img src={window.logoURL} alt="the word 'align' in white lettering on a purple background" width='74'/></Link>
            <p>Accounts dropdown</p>
            <Link to='/open-account'>Open an Account</Link>
          </ul>
          <ul className='right-nav'>
            <button onClick={this.openSidebar.bind(this)}>Profile and Settings</button>
            <button onClick={this.handleLogout.bind(this)}>Log Out</button>
          </ul>
        </nav>
      </div>
    );
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));