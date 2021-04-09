import React from 'react';
import { fetchAllAccounts } from '../../actions/account_actions';
import Navbar from './navbar';
import AccountsIndex from './accounts_index';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { 
    currentUser: state.entities.users[state.session.id],
    accounts: Object.values(state.entities.accounts)
  }
};

const mapDispatchToProps = dispatch => {
  return { fetchAllAccounts: () => dispatch(fetchAllAccounts()) }
}

class Dashboard extends React.Component{
  
  componentDidMount(){
    this.props.fetchAllAccounts();
  };

  render(){
    if (!this.props.accounts) return null;
    return(
      <div>
        <Navbar />
        <p>Snapshot</p>
        <p>Hello, {this.props.currentUser.fname}</p>
        <h1>BANK ACCOUNTS</h1>
        
        <AccountsIndex 
          accounts={this.props.accounts}
          filter={{external: false, acctType: 'checkings'}}
          header={'acctType'}
        />
        <AccountsIndex 
          accounts={this.props.accounts}
          filter={{external: false, acctType: 'savings'}}
          header={'acctType'}
        />
        <AccountsIndex 
          accounts={this.props.accounts}
          filter={{external: false, acctType: 'money market'}}
          header={'acctType'}
        />
      </div>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);