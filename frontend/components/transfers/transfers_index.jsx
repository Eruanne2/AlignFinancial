import React from 'react';
import { fetchAllTransfers } from '../../actions/transfer_actions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


const mapStateToProps = state => {
  return {
    accounts: state.entities.accounts, // do NOT change to array! used to lookup accounts by index
    // transfers: Object.values(state.entities.transfers)
  }
};


const mapDispatchToProps = dispatch => {
  return {fetchAllTransfers: () => dispatch(fetchAllTransfers())}
};


class TransfersIndex extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      filteredTransfers: [],
      accounts: this.props.accounts
    };
    this.matchesFilterProp = this.matchesFilterProp.bind(this);
  };


  componentDidMount(){
    this.props.fetchAllTransfers()
      .then(res => this.setState({filteredTransfers: Object.values(res.transfers).filter(transfer => this.matchesFilterProp(transfer)).sort((a,b) => a.createdAt < b.createdAt ? 1 : -1)}))
    console.log('transfers have been fetched')
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
    console.log('component is trying to render')
    
    const { accounts, filteredTransfers } = this.state;
    if (filteredTransfers.length < 1) return <h1 className='no-activity-message'>There is no account activity to display.</h1>
    return(
      <div className='transfers-index-container'>
        {this.props.filter.acctId ? <h1>Transaction History</h1> : <h1>Activity</h1>}
        {this.props.filter.acctId && <p id='transfer-note'>To view or create new transfers, go to <Link to='/transfers'>Transfers</Link>.</p>}
        <br/>
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

export default connect(mapStateToProps, mapDispatchToProps)(TransfersIndex);