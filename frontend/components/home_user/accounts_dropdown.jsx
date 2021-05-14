import React from 'react';
import { Link } from 'react-router-dom';
import { formatMoney } from '../../utils/formatting_util';

class AccountsDropdown extends React.Component{
  render(){
    return(
      <div className='accts-dropdown-container'>
        <div className='arrow-holder'><span id='dropdown-arrow'></span></div>
        <div>
          <h1><Link to='/dashboard'>View Snapshot</Link></h1>
          <h1 onClick={this.props.closeDropdown}>{`\u00D7`}</h1>
        </div>
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
                  <h3>{formatMoney(account.balance)}</h3>
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