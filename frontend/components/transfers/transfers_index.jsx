import React from 'react';
import { fetchAllTransfers } from '../../actions/transfer_actions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAllAccounts } from '../../actions/account_actions';
import { formatMoney } from '../../utils/formatting_util';


const mapStateToProps = state => {
  return {
    accounts: state.entities.accounts, // do NOT change to array! used to lookup accounts by id
    transfers: Object.values(state.entities.transfers)
  }
};


const mapDispatchToProps = dispatch => {
  return {
    fetchAllTransfers: () => dispatch(fetchAllTransfers()),
    fetchAllAccounts: () => dispatch(fetchAllAccounts())
  }
};


class TransfersIndex extends React.Component {
  constructor(props){
    super(props);
    this.matchesFilterProp = this.matchesFilterProp.bind(this);
  };


  componentDidMount(){
    this.props.fetchAllAccounts()
    this.props.fetchAllTransfers()
  }
  

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
    const { accounts, transfers } = this.props;
    const filteredTransfers = transfers.filter(transfer => this.matchesFilterProp(transfer)).sort((a,b) => a.createdAt < b.createdAt ? 1 : -1)

    if (filteredTransfers.length < 1 || accounts.length < 1) return <h1 className='no-activity-message'>There is no account activity to display.</h1>
    return(
      <div className='transfers-index-container'>
        {this.props.filter.acctId ? <h1>Transaction History</h1> : <h1>Activity</h1>}
        {this.props.filter.acctId && <p id='transfer-note'>To view all activity or create new transfers, go to <Link to='/transfer'>Transfers</Link>.</p>}
        <br/>
        <ul>
          <li>
            <p>DATE REQUESTED</p>
            <p>FROM</p>
            <p>TO</p>
            <p>AMOUNT</p>
            <p>MEMO</p>
          </li>
          {filteredTransfers.map((transfer, idx) => {
            return <li key={idx}>
              <p>{this.formatDate(transfer.createdAt)}</p>
              <p>
                {(!!accounts[transfer.fromAcctId])
                  ? accounts[transfer.fromAcctId].nickname + '••••' + accounts[transfer.fromAcctId].acctNum % 10000
                  : ' [Closed Account]'
                }
              </p>
              <p>
                {(!!accounts[transfer.toAcctId])
                  ? accounts[transfer.toAcctId].nickname + '••••' + accounts[transfer.toAcctId].acctNum % 10000
                  : ' [Closed Account]'
                }
              </p>
              <p>{formatMoney(transfer.amount)}</p>
              <p>{transfer.memo}</p>
            </li>
          })}
        </ul>
      </div>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TransfersIndex);