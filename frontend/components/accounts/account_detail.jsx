import React from 'react';
import { fetchAccount, deleteAccount, updateAccount } from '../../actions/account_actions';
import { fetchAllTransfers } from '../../actions/transfer_actions';
import Navbar from '../home_user/navbar';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';
import TransfersIndex from '../transfers/transfers_index';

const mapStateToProps = state => {
  return { 
    accounts: state.entities.accounts,
    transfers: Object.values(state.entities.transfers),
    accountErrors: state.errors.accountErrors
  }
}

const mapDispatchToProps = dispatch => {
  return { 
    deleteAccount: acctId => dispatch(deleteAccount(acctId)),
    fetchAccount: acctId => dispatch(fetchAccount(acctId)),
    fetchAllTransfers: () => dispatch(fetchAllTransfers()),
    updateAccount: acctData => dispatch(updateAccount(acctData))
  }
};

class AccountDetail extends React.Component{
  constructor(props){
    super(props);
    this.state = { 
      dropdown: false, 
      editNickname: false,
      infoPopup: false
    }
    this.transfers = [];
    this.toggleOption = this.toggleOption.bind(this);
  };

  componentDidMount(){
    this.props.fetchAccount(this.props.match.params.accountId);
    this.setState({account: this.props.accounts[this.props.match.params.accountId]}, this.render());
    this.transfers = this.props.fetchAllTransfers();
  }

  closeAccount(e){
    e.preventDefault();
    if (this.props.accountErrors.length > 1) return null;
    this.props.deleteAccount(this.state.account.id)
      .then(res => this.props.history.goBack())
      .fail(res => this.openPopup())
  };

  toggleOption(option){
    return e => { 
      e.preventDefault();
      this.setState({ [option]: !this.state[option]}) 
    }
  };

  openPopup(){
    this.setState({ infoPopup: true}) 
  }

  updateNickname(e){
    let account = this.state.account;
    account.nickname = e.currentTarget.value;
    this.setState({ account });
  };

  submitNickname(e){
    e.preventDefault();
    this.toggleOption('editNickname')(new Event('click'));
    this.props.updateAccount(this.state.account);
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
          <ul className={`acct-info ${account.acctType.replace(' ', '-').concat('-acct')}`}>
            <div>
              {!this.state.editNickname &&
                <div>
                  <h1>{account.nickname}</h1>
                  <button onClick={this.toggleOption('editNickname')}>Edit Nickname</button>
                </div>
              }
              {this.state.editNickname &&
                <form className='edit-nickname'>
                  <input type='text' value={account.nickname} onChange={this.updateNickname.bind(this)}/>
                  <br/>
                  <button id='save-nickname-btn' onClick={this.submitNickname.bind(this)}>Save</button>
                  <button id='cancel-nickname-btn'onClick={this.toggleOption('editNickname')}>Cancel</button>
                </form>
              }
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

          <h2 onClick={this.toggleOption('dropdown')}>
            { this.state.dropdown ? <i><FontAwesomeIcon icon={faCaretDown}/></i> : <i><FontAwesomeIcon icon={faCaretRight}/></i>}
            Account Details
          </h2>
          {this.state.dropdown &&
            <ul className='acct-details'>
              <li>
                <h3>Routing Number:</h3>
                <p>{account.routingNum}</p>
              </li>
              <li>
                <h3>Account Type:</h3>
                <p>{account.acctType}</p>
              </li>
              <li>
                <h3>Transfer Limit:</h3>
                <p>{account.transferLimit}</p>
              </li>
              <li>
                <h3>APY:</h3>
                <p>{account.interestRate}%</p>
              </li>
              <li>
                <h3>Date Opened:</h3>
                <p>{(new Date(account.createdAt)).toDateString()}</p>
              </li>
              <li><button onClick={this.closeAccount.bind(this)}>Close Account</button></li>
            </ul>
          }
        </section>
        {this.state.infoPopup && 
          <div className='error-popup'>
            <i className='error'><FontAwesomeIcon icon={faExclamationCircle}/></i>
            <p><em>{this.props.accountErrors}</em> Please transfer assets to another account, then try again.</p>
          </div>
        }
        {this.transfers && 
          <TransfersIndex transfers={this.props.transfers} filter={{ userId: window.currentUser.id, acctId: this.state.account.id}}/> 
        }
      </div>
    )
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountDetail));