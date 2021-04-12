import React from 'react';
import { logout } from '../../actions/session_actions';
import { toggleSidebar, toggleNightMode, toggleAccessibleView } from '../../actions/ui_actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { sidebar: state.ui.sidebar, nightMode: state.ui.nightMode, accessibleView: state.ui.accessibleView }
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    toggleSidebar: () => dispatch(toggleSidebar()),
    toggleNightMode: () => dispatch(toggleNightMode()),
    toggleAccessibleView: () => dispatch(toggleAccessibleView())
  }
};


class SettingsSidebar extends React.Component{
  constructor(props){
    super(props);
    this.state = { dropdown: '' }
  }

  closeSidebar(e){
    e.preventDefault();
    document.querySelector('.sidebar').classList.add('close-sidebar-animate');
    setTimeout(this.props.toggleSidebar, 300);
  };

  showDropdown(dropdown){
    return e => {
      (this.state.dropdown === dropdown) ? this.setState({ dropdown: '' }) : this.setState({ dropdown })
    }
  };

  handleChange(type){
    if (type === 'nightMode') return e => this.props.toggleNightMode();
    if (type === 'accessibleView') return e => this.props.toggleaccessibleView();
  };

  handleLogout(e){
    e.preventDefault();
    this.closeSidebar(e);
    this.props.logout();
    this.props.history.push('/');
  }

  render(){
    if (!this.props.sidebar || !window.currentUser) return null;
    return(
      <div className='sidebar settings-sidebar'>
        <button className='close-sidebar' onClick={this.closeSidebar.bind(this)}>{`\u00D7`}</button>
        <button className='logout' onClick={this.handleLogout.bind(this)}>Log Out</button>
        <h2 onClick={this.showDropdown('site')}>
          { this.state.dropdown === 'site' ? <i><FontAwesomeIcon icon={faCaretDown}/></i> : <i><FontAwesomeIcon icon={faCaretRight}/></i>}
          Site settings
        </h2>
        { this.state.dropdown === 'site' && 
          <ul>
            <li>
              <h3>Dark Mode</h3>
              <input type='checkbox' onChange={this.handleChange('nightMode')}/> {/* these will become toggle switches*/}
            </li>
            <li>
              <h3>Accessible View</h3>
              <input type='checkbox' onChange={this.handleChange('accessibleView')}/>
            </li>
          </ul>
        }
        <h2 onClick={this.showDropdown('user')}>
          { this.state.dropdown === 'user' ? <i><FontAwesomeIcon icon={faCaretDown}/></i> : <i><FontAwesomeIcon icon={faCaretRight}/></i>}
          User settings
        </h2>
        { this.state.dropdown === 'user' &&
          <ul>
            <li onClick={this.closeSidebar.bind(this)}>
              <Link to ='/profile'>Update Your Information</Link>
            </li>
          </ul>
        }
        <h2 onClick={this.showDropdown('quick-links')}>
          { this.state.dropdown === 'quick-links' ? <i><FontAwesomeIcon icon={faCaretDown}/></i> : <i><FontAwesomeIcon icon={faCaretRight}/></i>}
          Quick Links
        </h2>
        { this.state.dropdown === 'quick-links' &&
          <ul>
            <li onClick={this.closeSidebar.bind(this)}>
              <Link to ='/external-accounts'>Manage External Accounts</Link>
            </li>
          </ul>
        }
      </div>
    )
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SettingsSidebar));