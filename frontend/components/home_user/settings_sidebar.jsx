import React from 'react';
import { toggleSidebar, toggleNightMode, toggleAccessibleView } from '../../actions/ui_actions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { sidebar: state.ui.sidebar, nightMode: state.ui.nightMode, accessibleView: state.ui.accessibleView }
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSidebar: () => dispatch(toggleSidebar()),
    toggleNightMode: () => dispatch(toggleNightMode()),
    toggleAccessibleView: () => dispatch(toggleAccessibleView())
  }
};


class SettingsSidebar extends React.Component{

  closeSidebar(e){
    e.preventDefault();
    this.props.toggleSidebar();
  };

  handleChange(type){
    if (type === 'nightMode') return e => this.props.toggleNightMode();
    if (type === 'accessibleView') return e => this.props.toggleaccessibleView();
  };

  render(){
    if (!this.props.sidebar || !window.currentUser) return null;
    return(
      <div className='sidebar'>
        <button onClick={this.closeSidebar.bind(this)}>x</button>
        <h2>Site settings</h2>
        <ul> {/* this will be a dropdown*/}
          <li>Dark Mode</li>
          <input type='checkbox' onChange={this.handleChange('nightMode')}/> {/* these will become toggle switches*/}
          <li>Accessible View</li>
          <input type='checkbox' onChange={this.handleChange('accessibleView')}/>
        </ul>
        <h2>User settings</h2>
        <Link to ='/profile'>Update Your Information</Link> {/* this will be a dropdown*/}
      </div>
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsSidebar);