import React from 'react';
import { toggleSidebar } from '../../actions/ui_actions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { sidebarOpen: state.ui.sidebar }
}

const mapDispatchToProps = dispatch => {
  return { toggleSidebar: () => dispatch(toggleSidebar())}
};

class SplashNavbar extends React.Component {
  
  openSidebar(e){
    e.preventDefault();
    if (this.props.sidebarOpen) {
      document.querySelector('.sidebar').classList.add('close-sidebar-animate');
      setTimeout(this.props.toggleSidebar, 300);
    } else this.props.toggleSidebar();
  };

  render(){
    return(
      <div>
        <nav className='splash-nav'>
          <Link to='/'><img src={window.logoWhiteURL}alt="the word 'align' in purple lettering on a white background" width='63'/></Link>
          <ul className='right-nav'>
            <a href='https://github.com/Eruanne2'>Github</a>
            <a href='https://www.linkedin.com/in/charis-ginn-9abb93173'>LinkedIn</a>
            <p>CV</p>
            <button onClick={this.openSidebar.bind(this)}>Log In</button>
          </ul>
        </nav>
      </div>
    );
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashNavbar);