import React from 'react';
import { logout } from '../../actions/session_actions';
import { toggleSidebar } from '../../actions/ui_actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Link, withRouter } from 'react-router-dom';
import AccountsDropdown from './accounts_dropdown';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { 
    currentUser: state.session.id, sidebarOpen: state.ui.sidebar,
    accounts: Object.values(state.entities.accounts)
  }
};

const mapDispatchToProps = dispatch => {
  return { 
    logout: () => dispatch(logout()),
    toggleSidebar: () => dispatch(toggleSidebar())
  };
};


class Navbar extends React.Component{
  constructor(props){
    super(props);
    this.state = { dropdown: false }
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown(e){
    (this.state.dropdown) ? document.body.classList.remove('stop-scrolling') : document.body.classList.add('stop-scrolling')
    this.setState({ dropdown: !this.state.dropdown })
  };

  openSidebar(e){
    e.preventDefault();
    if (this.props.sidebarOpen) {
      document.querySelector('.sidebar').classList.add('close-sidebar-animate');
      setTimeout(this.props.toggleSidebar, 300);
    } else this.props.toggleSidebar();
  };

  handleLogout(e){
    e.preventDefault();
    setTimeout(this.redirectToSplash.bind(this), 100)
    this.props.logout();
  }
  
  redirectToSplash(){
    this.props.history.push('/');
  }

  render(){
    if (!this.props.currentUser) return(
      <nav className='user-nav'>
        <Link to='/'><img src={window.logoURL} alt="the word 'align' in white lettering on a purple background" width='74'/></Link>
        <ul className='right-nav'>
          <a href='https://github.com/Eruanne2' target="_blank">Github</a>
          <a href='https://www.linkedin.com/in/charis-ginn-9abb93173' target="_blank">LinkedIn</a>
          <a href='https://www.charisginn.com' target="_blank">Porfolio</a>
        </ul>
      </nav>
    ); 
    return(
      <div>
        {this.state.dropdown && <AccountsDropdown accounts={this.props.accounts} closeDropdown={this.toggleDropdown}/>}
        <nav className='user-nav'>
          <ul className='left-nav'>
            <li><Link to='/'><img src={window.logoURL} alt="the word 'align' in white lettering on a purple background" width='74'/></Link></li>
            <li onClick={this.toggleDropdown}>Accounts <i><FontAwesomeIcon icon={faChevronDown}/></i></li>
            <li><Link to='/open-account'>Open an Account</Link></li>
          </ul>
          <ul className='right-nav'>
            <button onClick={this.openSidebar.bind(this)}>
              <i><FontAwesomeIcon icon={faUserCircle}/></i>
              Profile and Settings
              <i><FontAwesomeIcon icon={faChevronDown}/></i>
            </button>
            <button onClick={this.handleLogout.bind(this)}>Log Out</button>
          </ul>
        </nav>
      </div>
    );
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));