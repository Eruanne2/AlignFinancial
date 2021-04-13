import React from 'react';
import { Link, withRouter } from 'react-router-dom';
// takes in a 'filter' object prop to filter accounts.
// e.g. {external: false, acctType: 'savings'}


class AccountsIndex extends React.Component{
  constructor(props){
    super(props);
    this.state = { 
      filteredAccts: this.props.accounts.filter(acct => this.matchesFilterProp(acct)),
      totals: {
        available: 0,
        current: 0,
        interestYTD: 0
      }
    };
    this.matchesFilterProp = this.matchesFilterProp.bind(this);
  };

  componentDidMount(){
    let totals = this.state.totals;
    this.state.filteredAccts.forEach(account => {
      totals = {
        available: totals.available + account.balance,
        current: totals.current + account.balance,
        interestYTD: totals.interestYTD + 12.34
      };
    });
    if (this.props.updateBalance) this.props.updateBalance(totals.available);
    this.setState({ totals })
  }

  matchesFilterProp(account){
    const filterProp = this.props.filter;
    let res = true;
    Object.keys(filterProp).forEach(key => {
      if (account[key] !== filterProp[key] ) res = false;
    });
    return res;
  };

  formatMoney(amount){
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    return formatter.format(amount);
  }

  generateHeader(){
    if (!this.props.filter.external) {
      const typeHeadings = { 'checkings': 'INTEREST CHECKING', 'savings': 'HIGH-YEILD SAVINGS', 'money market': 'MONEY MARKETS'}
      return typeHeadings[this.props.filter.acctType];
    }
    return 'External Accounts';
  };

  render(){
    if (this.state.filteredAccts.length < 1) return null;
    return(
      <div className='acct-index-container'>
        <ul className='acct-index-headers'>
          <li>{this.generateHeader()}</li>
          <li>AVAILABLE</li>
          <li>CURRENT</li>
          <li>INTEREST YTD</li>
          <li>ANNUAL PERCENTAGE YIELD</li>
        </ul>
        {this.state.filteredAccts.map((account,idx) => {
          return (
            <ul key={idx} className='acct-views'>
              <Link to={`/account-detail/${account.id}`}><span>{account.nickname}</span> ••••{account.acctNum % 10000}</Link>
              <li>{this.formatMoney(account.balance)}</li>
              <li>{this.formatMoney(account.balance)}</li>
              <li>12.34</li>
              <li>{this.formatMoney(account.interestRate)}</li>
            </ul>
          )
        })}
        <ul className='acct-index-total'>
          <li>TOTAL</li>
          <li>{this.formatMoney(this.state.totals.available)}</li>
          <li>{this.formatMoney(this.state.totals.current)}</li>
          <li>{this.formatMoney(this.state.totals.interestYTD)}</li>
          <li></li>
        </ul>
      </div>
    )
  }
};

export default withRouter(AccountsIndex);