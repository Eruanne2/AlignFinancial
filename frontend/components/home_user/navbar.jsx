import React from 'react';

class Navbar extends React.Component{

  handleLogout(e){
    e.preventDefault();
    this.props.logout();
  }

  render(){
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

export default Navbar;