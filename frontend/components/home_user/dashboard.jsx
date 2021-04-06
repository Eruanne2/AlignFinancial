import React from 'react';
import Navbar from './navbar';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { currentUser: state.entities.users[state.session.id] }
};

class Dashboard extends React.Component{
  render(){
    return(
      <div>
        <Navbar />
        <p>Snapshot</p>
        <p>Hello, {this.props.currentUser.fname}</p>
      </div>
    )
  }
};

export default connect(mapStateToProps)(Dashboard);