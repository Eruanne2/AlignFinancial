import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { accounts: state.entities.accounts }
}

class TransfersIndex extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      filteredTransfers: this.props.transfers.filter(transfer => this.matchesFilterProp(transfer)),
      accounts: this.props.accounts
    };
    this.matchesFilterProp = this.matchesFilterProp.bind(this);
  };
  
  matchesFilterProp(transfer){
    const filterProp = Object.assign({}, this.props.filter);
    if (filterProp.acctId) {
      if (!(transfer.toAcctId === filterProp.acctId || transfer.fromAcctId === filterProp.acctId)) return false;
      delete filterProp.acctId;
    }
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
    const { accounts, filteredTransfers } = this.state;
    if (filteredTransfers.length < 1) return null;
    return(
      <div className='transfers-index-container'>
        {this.props.filter.accId ? <h1>Transaction History</h1> : <h1>Activity</h1>}
        <ul>
          <li>
            <p>DATE REQUESTED</p>
            <p>FROM</p>
            <p>TO</p>
            <p>AMOUNT</p>
            <p></p>
          </li>
          {filteredTransfers.map((transfer, idx) => {
            return <li key={idx}>
              <p>{this.formatDate(transfer.createdAt)}</p>
              <p>{accounts[transfer.fromAcctId].nickname}••••{accounts[transfer.fromAcctId].acctNum % 10000}</p>
              <p>{accounts[transfer.toAcctId].nickname}••••{accounts[transfer.toAcctId].acctNum % 10000}</p>
              <p>{transfer.amount}</p>
              <p>View</p> {/* dropdown to view exact time and memo*/}
            </li>
          })}
        </ul>
      </div>
    )
  }
};

export default connect(mapStateToProps)(TransfersIndex);