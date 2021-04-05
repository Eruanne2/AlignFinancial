import React from 'react';
import { toggleSidebar } from '../../actions/ui_actions';
import LoginSidebar from './login_sidebar';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => {
  return { toggleSidebar: () => dispatch(toggleSidebar())}
};

class SplashNavbar extends React.Component {
  constructor(props){
    super(props);
  };

  openSidebar(e){
    e.preventDefault();
    this.props.toggleSidebar();
  };

  render(){
    return(
      <div>
        <p>Logo</p>
        <p>github</p>
        <p>linkedin</p>
        <p>etc</p>
        <button onClick={this.openSidebar.bind(this)}>Log In</button>
        <LoginSidebar />
      </div>
    );
  };
};

export default connect(null, mapDispatchToProps)(SplashNavbar);