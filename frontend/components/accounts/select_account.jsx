import React from 'react';
import { createAccount } from '../../actions/account_actions';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { account: { acctType: '', userId: 0, external: false } }
};

const mapDispatchToProps = dispatch => {
  return { createAccount: acctData => dispatch(createAccount(acctData)) }
};

class SelectAccount extends React.Component{
  constructor(props){
    super(props);
    this.state = this.props.account;
  };
  
  handleSelection(type){
    return e => {
      e.preventDefault();
      this.setState( { acctType: type });
    }
  };
  
  handleSubmit(e){
    e.preventDefault();
    this.setState({ userId: window.currentUser.id})
    this.props.createAccount(this.state);
  };
  
  displayInfo(field){
    switch(field){
      case 'checkings':
        return 'You have chosen a checkings account!'
      case 'savings':
        return 'You have chosen a savings account!'
      case 'money market':
        return 'You have chosen a money market account!'
      default:
        return '';
    }
  };

  render(){
    return(
      <div>
        <form>
          this is the new account form.
          <div className='account-selections'>
            <button onClick={this.handleSelection('checkings')}>Checkings</button>
            <button onClick={this.handleSelection('savings')}>Savings</button>
            <button onClick={this.handleSelection('money market')}>Money Market</button>
          </div>
          <div className='account-info'>
            {this.displayInfo(this.state.acctType)}
          </div>
          <input type='submit' onClick={this.handleSubmit.bind(this)} value='Next' />
        </form>
      </div>
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectAccount);