import React from 'react';

class Snapshot extends React.Component{

  render(){
    return(
      <div className='snapshot-container'>
        <section className='left-view'>
          <h1>Snapshot</h1>
          <p>Hello, {this.props.currentUser.fname}</p>
          <p>Last Login: sometime</p>

          <h2 id='balance-header'>TOTAL BALANCE<span className='question-icon'>?</span></h2>
          <h2 id='balance'>${this.props.categoryBalances.total}</h2>
        </section>

        <svg>graph goes here</svg>

        <section className='right-view'>
          <ul>
            <div>
              <h1>BANK ACCOUNTS</h1>
              <h1>AVAILABLE BALANCE</h1>
            </div>
            {Object.keys(this.props.categoryBalances).map(category => {
              if (category === 'total') return null;
              return <div key={Math.floor(Math.random() * 1000)}>
                <h1>{category}</h1>
                <h1>{this.props.categoryBalances[category]}</h1>
              </div>
            })}
          </ul>
        </section>
      </div>
    )
  }
};

export default Snapshot;