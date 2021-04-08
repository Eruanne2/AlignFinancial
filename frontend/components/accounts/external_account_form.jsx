import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { account: { acctType: '', userId: 0, external: true, acctNum: 0, routingNum: 0 } }
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
    this.state.userId = window.currentUser.id;
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

          </label>
          <label>Account Number
          <input type='text' value={this.state.routingNum} onChange={this.updateField('routingNum')}/>
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