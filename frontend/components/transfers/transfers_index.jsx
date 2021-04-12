import React from 'react';

class TransfersIndex extends React.Component {
  formatDate(rubyDateString){
    let date = new Date(rubyDateString);
    date = date.toDateString();
    return date.slice(4,10) + ',' + date.slice(10);
  };

  render(){
    if (!this.props.transfers) return null;
    return(
      <div className='transfers-index-container'>
        <h1>Activity</h1>
        {this.props.transfers.map((transfer, idx) => {
          return <li key={idx}>
            <p>{this.formatDate(transfer.createdAt)}</p>
            <p>{transfer.fromAcctId}</p>
            <p>{transfer.toAcctId}</p>
            <p>{transfer.amount}</p>
            <p>View</p> {/* dropdown to view exact time and memo*/}
          </li>
        })}
      </div>
    )
  }
};

export default TransfersIndex;