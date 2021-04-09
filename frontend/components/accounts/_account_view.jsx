import React from 'react';
import { Link } from 'react-router-dom';
// takes in account object as prop

class AccountView extends React.Component{
  render(){
    return(
      <div>
        <Link to={`/account-detail/${this.props.account.id}`}>Account {this.props.account.acctNum}</Link>
      </div>
    )
  }
};

export default AccountView;