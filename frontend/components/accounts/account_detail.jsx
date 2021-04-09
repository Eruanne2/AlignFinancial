import React from 'react';
import { fetchAccount, deleteAccount } from '../../actions/account_actions';
import Navbar from '../home_user/navbar';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { accounts: state.entities.accounts }
}

const mapDispatchToProps = dispatch => {
  return { 
    deleteAccount: acctId => dispatch(deleteAccount(acctId)),
    fetchAccount: acctId => dispatch(fetchAccount(acctId))
  }
};

class AccountDetail extends React.Component{
  constructor(props){
    super(props);
    this.state = { }
  };

  componentDidMount(){
    this.props.fetchAccount(this.props.match.params.accountId);
    this.setState({account: this.props.accounts[this.props.match.params.accountId]}, this.render())
  }

  closeAccount(e){
    e.preventDefault();
    this.props.deleteAccount(this.state.account.id)
    this.props.history.goBack();
  };

  render(){
    if (!this.state.account) return null;
    return(
      <div>
        <Navbar/>
        <h1>Account info</h1>
        <ul>
          {Object.keys(this.state.account).map((key, idx) => {
            return <p key={idx}>{key}: {this.state.account[key]}</p>
          })}
        </ul>
        <button onClick={this.closeAccount.bind(this)}>Close Account</button>
        <h1>Transaction index goes here</h1>
      </div>
    )
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountDetail));