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
    this.props.createAccount(this.state);
  }
  
  checkNumsMatch(e){
    this.numsMatch = (e.currentTarget.value === this.state.acctNum);
  }

  render(){
    return(
      <div className='external-acct-form'>
        <h1 id='external-acct-header'>Add External Account</h1>
        <p>You must be an owner on the account to use it for transfers.</p>

        <div>
          <label htmlFor='select-type'>ACCOUNT TYPE</label>
          <select id='select-type' onChange={this.updateField('acctType')}>
            <option value='checkings' >Checking Account</option>
            <option value='savings'>Savings Account</option>
          </select>
        </div>

        <div>
          <label htmlFor='acct-nickname' >ACCOUNT NICKNAME</label>
          <input id='acct-nickname' type='text' value={this.state.nickname} onChange={this.updateField('nickname')}/>
        </div>

        <img src={window.exampleAccount} alt="an illustration of the bottom of a check with the account number on the left and the routing number on the right" width='600'/>
          
        <div>
          <label htmlFor='ruoting-again'>ROUTING NUMBER</label>
          <input id='ruoting-again' type='text' value={this.state.routingNum} onChange={this.updateField('routingNum')}/>
          {this.numsMatch ? '' : <p className='error'>'Account numbers must match.'</p>}
        </div>

        <div>
          <label htmlFor='acct-num'>ACCOUNT NUMBER</label>
          <input id='acct-num'type='text' value={this.state.acctNum} onChange={this.updateField('acctNum')}/>
        </div>
          
        <div>
          <label htmlFor='acct-num-again'>RE-ENTER ACCOUNT NUMBER (dead rn)</label>
          <input id='acct-num-again' type='text' id='verify-acct-num' onChange={this.checkNumsMatch.bind(this)}/>
        </div>
          
        <button onClick={this.handleSubmit.bind(this)}>Next</button>
      </div>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ExternalAccountForm);