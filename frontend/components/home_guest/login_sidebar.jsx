import React from 'react';
import { toggleSidebar } from '../../actions/ui_actions';
import LoginForm from './_login_form';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { sidebar: state.ui.sidebar }
};

const mapDispatchToProps = dispatch => {
  return { toggleSidebar: () => dispatch(toggleSidebar())}
};

class LoginSidebar extends React.Component{
  
  closeSidebar(e){
    e.preventDefault();
    this.props.toggleSidebar();
  };

  render(){
    if (!this.props.sidebar || window.currentUser) return null;
    return(
    <div className='sidebar'>
      <button onClick={this.closeSidebar.bind(this)}>x</button>
      <LoginForm/>
    </div>
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginSidebar);