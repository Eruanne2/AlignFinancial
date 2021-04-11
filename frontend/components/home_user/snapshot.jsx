import React from 'react';

class Snapshot extends React.Component{
  render(){
    return(
      <div className='snapshot-container'>
        <h1>Snapshot</h1>
        <p>Hello, {this.props.currentUser.fname}</p>

        
      </div>
    )
  }
};

export default Snapshot;