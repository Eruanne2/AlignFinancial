import React from 'react';
import { Link } from 'react-router-dom';

class AccountsDropdown extends React.Component{
  formatMoney(amount){
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    return formatter.format(amount);
  }

  render(){
    return(
      <div className='accts-dropdown-container'>
        <h1><Link to='/dashboard'>View Snapshot</Link></h1>
        <ul className='acct-dropdown-list'>        
          {this.props.accounts.map((account, idx) => {
            if (account.userId !== window.currentUser.id || account.external) return null;
            return <li key={idx} >
              <Link to={`/account-detail/${account.id}`} className={account.acctType.replace(' ', '-').concat('-acct')}>
                <div>
                  <h2>{account.acctType.toUpperCase()}</h2>
                  <h2>AVAILABLE</h2>
                </div>
                <div>
                  <h3><span>{account.nickname}</span>••{account.acctNum % 10000}</h3>
                  <h3>{this.formatMoney(account.balance)}</h3>
                </div>
              </Link>
            </li>
          })}
        </ul>
        <h1><Link to='/open-account'>Open Account</Link></h1>
      </div>
    )
  };
};

export default AccountsDropdown;