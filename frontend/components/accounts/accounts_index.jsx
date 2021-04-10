import React from 'react';
import { Link, withRouter } from 'react-router-dom';
// takes in a 'filter' object prop to filter accounts.
// e.g. {external: false, acctType: 'savings'}


class AccountsIndex extends React.Component{
  constructor(props){
    super(props);
    this.matchesFilterProp = this.matchesFilterProp.bind(this);
  }

  matchesFilterProp(account){
    const filter = this.props.filter;
    let res = true;
    Object.keys(filter).forEach(key => {
      if (account[key] !== filter[key]) res = false;
    });
    return res;
  };

  generateHeader(){
    if (!this.props.filter.external) {
      const typeHeadings = { 'checkings': 'INTEREST CHECKING', 'savings': 'SAVING', 'money market': 'MONEY MARKETS'}
      return typeHeadings[this.props.filter.acctType];
    }
    return 'External Accounts';
  }

  render(){
    if (this.props.accounts.length < 1) return null;
    const filteredAccts = this.props.accounts.filter(acct => this.matchesFilterProp(acct)) 
    return(
      <div className='acct-index-container'>
        <ul className='acct-index-headers'>
          <li>{this.generateHeader()}</li>
          <li>AVAILABLE</li>
          <li>CURRENT</li>
          <li>INTEREST YTD</li>
          <li>ANNUAL PERCENTAGE YIELD</li>
        </ul>
        {filteredAccts.map((account,idx) => {
          return (
            <ul key={idx} className='acct-views'>
              <Link to={`/account-detail/${account.id}`}><span>Account</span> ••••{account.acctNum % 10000}</Link>
              <li>{account.balance}</li>
              <li>{account.balance}</li>
              <li>1234</li>
              <li>{account.interestRate}</li>
            </ul>
          )
        })}
        <ul className='acct-index-total'>
          <li>TOTAL</li>
          <li>Total1</li>
          <li>Total2</li>
          <li>Total3</li>
          <li></li>
        </ul>
      </div>
    )
  }
};

export default withRouter(AccountsIndex);