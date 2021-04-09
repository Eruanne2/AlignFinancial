import React from 'react';
import { createAccount } from '../../../actions/account_actions';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { account: { acctType: 'checkings', userId: state.session.id, external: true, acctNum: '', routingNum: '' } }
};

const mapDispatchToProps = dispatch => {
  return { createAccount: acctData => dispatch(createAccount(acctData)) }
};



class ExternalAccountForm extends React.Component {
  constructor(props){
    super(props);
    this.state = this.props.account;
    this.numsMatch = true;
  }

  updateField(field){
    return e => this.setState({ [field]: e.currentTarget.value })
  }

  handleSubmit(e){
    e.preventDefault();
    this.setState({ userId: window.currentUser.id})
    this.props.createAccount(this.state);
  }
  
  checkNumsMatch(e){
    this.numsMatch = (e.currentTarget.value === this.state.acctNum);
  }

  render(){
    return(
      <div>
        <form>
          <label>Accout Type
            <select onChange={this.updateField('acctType')}>
              <option value='checkings' >Checking Account</option>
              <option value='savings'>Savings Account</option>
            </select>
          </label>
          <label>Account Number
            <input type='text' value={this.state.acctNum} onChange={this.updateField('acctNum')}/>
          </label>
          <label>Re-enter Account Number (dead rn)
            <input type='text' id='verify-acct-num' onChange={this.checkNumsMatch.bind(this)}/>
          </label>
          {this.numsMatch ? 'yes' : 'no'}
          <label>Routing Number
            <input type='text' value={this.state.routingNum} onChange={this.updateField('routingNum')}/>
          </label>
          <button onClick={this.handleSubmit.bind(this)}>Next</button>
        </form>
      </div>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ExternalAccountForm);