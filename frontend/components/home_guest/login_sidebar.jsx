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
    document.querySelector('.sidebar').classList.add('close-sidebar-animate');
    setTimeout(this.props.toggleSidebar, 300);
  };

  render(){
    if (!this.props.sidebar || window.currentUser) return null;
    return(
    <div className='sidebar'>
      <button className='close-sidebar' onClick={this.closeSidebar.bind(this)}>{`\u00D7`}</button>
      <LoginForm sidebar={true}/>
    </div>
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginSidebar);