import React from 'react';

class TransfersIndex extends React.Component {
  constructor(props){
    super(props);
    this.state = { filteredTransfers: this.props.transfers.filter(transfer => this.matchesFilterProp(transfer)) };

    this.matchesFilterProp = this.matchesFilterProp.bind(this);
  };
  
  matchesFilterProp(transfer){
    const filterProp = this.props.filter;
    let res = true;
    Object.keys(filterProp).forEach(key => {
      if (transfer[key] !== filterProp[key]) {
        res = false;
      }
    });
    return res;
  };

  formatDate(rubyDateString){
    let date = new Date(rubyDateString);
    date = date.toDateString();
    return (date.slice(4,10) + ',' + date.slice(10)).toUpperCase();
  };

  render(){
    if (this.state.filteredTransfers.length < 1) return null;
    return(
      <div className='transfers-index-container'>
        <h1>Activity</h1>
        <ul>
          <li>
            <p>DATE REQUESTED</p>
            <p>FROM</p>
            <p>TO</p>
            <p>AMOUNT</p>
            <p></p>
          </li>
          {this.state.filteredTransfers.map((transfer, idx) => {
            return <li key={idx}>
              <p>{this.formatDate(transfer.createdAt)}</p>
              <p>{transfer.fromAcctId}</p>
              <p>{transfer.toAcctId}</p>
              <p>{transfer.amount}</p>
              <p>View</p> {/* dropdown to view exact time and memo*/}
            </li>
          })}
        </ul>
      </div>
    )
  }
};

export default TransfersIndex;