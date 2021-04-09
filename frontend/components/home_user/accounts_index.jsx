import React from 'react';
import AccountView from '../accounts/_account_view';
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

  render(){
    if (this.props.accounts.length < 1) return null;
    const filteredAccts = this.props.accounts.filter(acct => this.matchesFilterProp(acct)) 
    return(
      <div className='acct-index-container'>
        <h1>{this.props.filter[this.props.header]}</h1>
        <ul>
          {filteredAccts.map((account,idx) => {
            return <AccountView key={idx} account={account}/>
          })}
        </ul>
      </div>
    )
  }
};

export default AccountsIndex;