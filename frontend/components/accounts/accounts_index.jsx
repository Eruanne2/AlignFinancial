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
          <p>{this.generateHeader()}</p>
          <p>AVAILABLE</p>
          <p>CURRENT</p>
          <p>INTEREST YTD</p>
          <p>ANNUAL PERCENTAGE YIELD</p>
        </ul>
        <ul className='acct-views'>
          {filteredAccts.map((account,idx) => {
            return (
              <ul className='acct-view-info'>
                <Link to={`/account-detail/${account.id}`}>Account {account.acctNum}</Link>
                <p>{account.balance}</p>
                <p>{account.balance}</p>
                <p>1234</p>
                <p>account.interestRate</p>
              </ul>
            )
          })}
        </ul>
        <ul className='acct-index-total'>
          <p>Total1</p>
          <p>Total2</p>
          <p>Total3</p>
        </ul>
      </div>
    )
  }
};

export default withRouter(AccountsIndex);