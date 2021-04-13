import React from 'react';
import { fetchAccount, deleteAccount } from '../../actions/account_actions';
import { fetchAllTransfers } from '../../actions/transfer_actions';
import Navbar from '../home_user/navbar';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TransfersIndex from '../transfers/transfers_index';

const mapStateToProps = state => {
  return { 
    accounts: state.entities.accounts,
    transfers: Object.values(state.entities.transfers)
  }
}

const mapDispatchToProps = dispatch => {
  return { 
    deleteAccount: acctId => dispatch(deleteAccount(acctId)),
    fetchAccount: acctId => dispatch(fetchAccount(acctId)),
    fetchAllTransfers: () => dispatch(fetchAllTransfers())
  }
};

class AccountDetail extends React.Component{
  constructor(props){
    super(props);
    this.state = { }
    this.transfers = [];
  };

  componentDidMount(){
    this.props.fetchAccount(this.props.match.params.accountId);
    this.setState({account: this.props.accounts[this.props.match.params.accountId]}, this.render());
    this.transfers = this.props.fetchAllTransfers();
  }

  closeAccount(e){
    e.preventDefault();
    this.props.deleteAccount(this.state.account.id)
    this.props.history.goBack();
  };

  formatMoney(amount){
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    return formatter.format(amount);
  }

  render(){
    const { account } = this.state;
    if (!account) return null;
    return(
      <div className='account-detail-container'>
        <Navbar/>
        <nav className='dash-nav'>
          <ul>
            <Link to='/transfer'>Make a Transfer</Link>
            <a href='https://github.com/Eruanne2'>Github</a>
            <a href='https://www.linkedin.com/in/charis-ginn-9abb93173'>LinkedIn</a>
            <p>CV</p>
          </ul>
        </nav>
        <section className='main-info-box'>
          <ul className='acct-info'>
            <div>
              <div><h1>{account.nickname}</h1>
                <button>Edit Nickname</button>
              </div>
              <form className='hidden'>
                <input type='text' value={account.nickname}/>
                <button>Submit</button>
                <button>Cancel</button>
              </form>
              <p><span>Account Number:</span>{account.acctNum}</p>
            </div>
            <div>
              <h2>AVAILABLE BALANCE</h2>
              <h3>{this.formatMoney(account.balance)}</h3>
            </div>
            <div>
              <h2>CURRENT BALANCE</h2>
              <h3>{this.formatMoney(account.balance)}</h3>
            </div>
            <div>
              <h2>INTEREST YTD</h2>
              <h3>{this.formatMoney(12.34)}</h3>
            </div>
            <div>
              <h2>ANNUAL PERCENTAGE YIELD</h2>
              <h3>{account.interestRate}%</h3>
            </div>
          </ul>

          <h2>Account Details</h2> {/*dropdown*/}
          <ul className='acct-details hidden'>
            {Object.keys(account).map((key, idx) => {
              return <li key={idx}>{key}: {account[key]}</li>
            })}
          <li><button onClick={this.closeAccount.bind(this)}>Close Account</button></li>
          </ul>
        </section>
        {this.transfers && 
          <TransfersIndex transfers={this.props.transfers} filter={{ userId: window.currentUser.id, acctId: this.state.account.id}}/> 
        }
      </div>
    )
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountDetail));