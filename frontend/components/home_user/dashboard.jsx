import React from 'react';
import { fetchAllAccounts } from '../../actions/account_actions';
import Navbar from './navbar';
import { Link } from 'react-router-dom';
import Snapshot from './snapshot';
import AccountsIndex from '../accounts/accounts_index';
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
  constructor(props){
    super(props);
    this.accounts = [];
    this.state = { 
      'Interest Checking': 0,
      'Savings': 0,
      'Money Markets': 0,
      total: 0
    };
    this.updateBalance = this.updateBalance.bind(this);
  }
  
  componentDidMount(){
    this.accounts = this.props.fetchAllAccounts();
  };

  updateBalance(category){
    return (balance) => this.setState({[category]: balance, total: this.state.total + balance});
  };

  render(){
    if (this.accounts.length === 0) return null;
    return(
      <div className='dashboard-container'>
        <Navbar />
        <nav className='dash-nav'>
          <ul>
            <Link to='/transfer'>Make a Transfer</Link>
            <a href='https://github.com/Eruanne2'>Github</a>
            <a href='https://www.linkedin.com/in/charis-ginn-9abb93173'>LinkedIn</a>
            <p>CV</p>
          </ul>
        </nav>
        <Snapshot 
          currentUser={this.props.currentUser} 
          accounts={this.props.accounts}
          categoryBalances={this.state}
        />

        <h1>BANK ACCOUNTS</h1>
        <ul className='acct-indices'>
          <AccountsIndex 
            accounts={this.props.accounts}
            filter={{external: false, acctType: 'checkings'}}
            updateBalance={this.updateBalance('Interest Checking')}
          />
          <AccountsIndex 
            accounts={this.props.accounts}
            filter={{external: false, acctType: 'savings'}}
            updateBalance={this.updateBalance('Savings')}
          />
          <AccountsIndex 
            accounts={this.props.accounts}
            filter={{external: false, acctType: 'money market'}}
            updateBalance={this.updateBalance('Money Markets')}
          />
        </ul>
      </div>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);