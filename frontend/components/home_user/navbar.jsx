import React from 'react';
import { logout } from '../../actions/session_actions';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { currentUser: state.session.id }
};

const mapDispatchToProps = dispatch => {
  return { 
    logout: () => dispatch(logout())
  };
};


class Navbar extends React.Component{

  handleLogout(e){
    e.preventDefault();
    this.props.logout();
  }

  render(){
    if (!this.props.currentUser) return( // you may run into problems with the currentUser here. if so, add a container to force the re-render.
      <div>
        <p>Logo</p>
        <p>github</p>
        <p>linkedin</p>
        <p>etc</p>
      </div>
    );
    return(
      <div>
        <p>Logo</p>
        <p>Accounts dropdown</p>
        <p>Open an Account</p>
        <p>Profile and Settings dropdown</p>
        <button onClick={this.handleLogout.bind(this)}>Log Out</button>
      </div>
    );
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);