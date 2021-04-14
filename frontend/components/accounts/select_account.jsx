import React from 'react';
import { createAccount } from '../../actions/account_actions';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { account: { acctType: '', userId: state.session.id, external: false } }
};

const mapDispatchToProps = dispatch => {
  return { createAccount: acctData => dispatch(createAccount(acctData)) }
};

class SelectAccount extends React.Component{
  constructor(props){
    super(props);
    this.state = this.props.account;
  };
  
  handleSelection(type){
    return e => {
      e.preventDefault();
      this.setState( { acctType: type });
    }
  };
  
  handleSubmit(e){
    e.preventDefault();
    this.props.createAccount(this.state)
    if (!!this.props.updateParent) {
      this.props.updateParent(3);
    }
  };

  formatDate(date){
    date = date.toDateString().slice(4);
    return date.slice(0,6) + ',' + date.slice(6)
  };
  
  displayInfo(field){
    switch(field){
      case 'checkings':
        return <div className='display-acct-benefits'>
          <p>'Interest Checking benefits:</p>
          <ul>
            <li>Use any Allpoint® ATM in the U.S. for free, plus reimbursements of up to $10 per statement cycle for fees charged at other ATMs nationwide</li>
            <li>Rate is variable and may change after the account is opened</li>
            <li>Fees may reduce earnings</li>
          </ul>
        </div>
      case 'savings':
        return <div className='display-acct-benefits'>
          <p>'Online Savings benefits:</p>
          <ul>
            <li>Six withdrawals limit per statement cycle</li>
            <li>Rate is variable and may change after the account is opened</li>
            <li>Fees may reduce earnings</li>
            <li>Coming Soon: Use buckets to organize your money and visualize what you’re saving for</li>
            <li>Coming Soon: Set up boosters to optimize and maximize your saving</li>
          </ul>
        </div>
      case 'money market':
        return <div className='display-acct-benefits'>
          <p>'Money Market benefits:</p>
          <ul>
            <li>Debit card and check access</li>
            <li>Unlimited deposits and ATM withdrawals + 6 additional withdrawals per statement cycle</li>
            <li>Rate is variable and may change after the account is opened</li>
            <li>Fees may reduce earnings</li>
          </ul>
        </div>
      default:
        return '';
    }
  };

  render(){
    return(
      <div className='select-accts-container'>
        <form>
          <div className='account-selections'>
            <button onClick={this.handleSelection('checkings')}>
              <img src={window.selectChecking} height={115} alt="the word 'align' in purple lettering on a white background"/>
            </button>
            <button onClick={this.handleSelection('savings')}>
              <img src={window.selectSavings} height={115} alt="the word 'align' in purple lettering on a white background"/>
            </button>
            <button onClick={this.handleSelection('money market')}>
              <img src={window.selectMM} height={115} alt="the word 'align' in purple lettering on a white background"/>
            </button>
          </div>
          <div className='account-info'>
            <p>Keep in mind, if you choose an account with a variable rate, your rate may change after the account is opened. 
              Rates and Annual Percentage Yields (APY) are accurate as of {this.formatDate(new Date())}.</p>
            {this.displayInfo(this.state.acctType)}
          </div>
          <input type='submit' onClick={this.handleSubmit.bind(this)} value='Next' />
        </form>
      </div>
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectAccount);