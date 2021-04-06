import React from 'react';
import { toggleSidebar } from '../../actions/ui_actions';
import { Link } from 'react-router-dom';
import LoginSidebar from './login_sidebar';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => {
  return { toggleSidebar: () => dispatch(toggleSidebar())}
};

class SplashNavbar extends React.Component {
  
  openSidebar(e){
    e.preventDefault();
    this.props.toggleSidebar();
  };

  render(){
    return(
      <div>
        <nav className='splashNav'>
          <Link to='/'><img src='assets/logo-on-white.png' alt="the word 'align' in white lettering on a purple background" width='70'/></Link>
          <ul>
            <a href='https://github.com/Eruanne2'>Github</a>
            <a href='www.linkedin.com/in/charis-ginn-9abb93173'>LinkedIn</a>
            <p>CV</p>
            <button onClick={this.openSidebar.bind(this)}>Log In</button>
          </ul>
        </nav>
        <LoginSidebar />
      </div>
    );
  };
};

export default connect(null, mapDispatchToProps)(SplashNavbar);