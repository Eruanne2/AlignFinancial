import React from 'react';
import { createAccount } from '../../../actions/account_actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { errors: state.errors.accountErrors }
};

const mapDispatchToProps = dispatch => {
  return { createAccount: acctData => dispatch(createAccount(acctData)) }
};

class ExternalAccountForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      acctType: 'checkings', 
      nickname: '',
      userId: window.currentUser, 
      external: true, 
      routingNum: '',
      acctNum: '', 
      checkAcctNum: ''
    }
  }

  updateField(field){
    return e => this.setState({ [field]: e.currentTarget.value })
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.createAccount(this.state);
  }

  showErrors(field){
    let fieldErrors = [];
    this.props.errors.forEach(error => {
      if (error.toLowerCase().includes(field)) fieldErrors.push(error);
    });
    fieldErrors = fieldErrors.map(error => {
      if (error.includes('Acct num')) return error.replace('Acct num', '');
      if (error.includes('Routing num')) return error.replace('Routing num', '');
      if (error.includes('Nickname')) return error.replace('Nickname', '');
      else return error;
    });
    // debugger
    if (fieldErrors.length < 1) return '';
    else return <span className='error' key={Math.floor(Math.random() * 1000)}>
      <i><FontAwesomeIcon icon={faExclamationCircle}/></i>
      {fieldErrors}
    </span>
  };

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
          <label htmlFor='acct-nickname' >ACCOUNT NICKNAME {this.showErrors('nickname')}</label>
          <input id='acct-nickname' type='text' value={this.state.nickname} onChange={this.updateField('nickname')}/>
        </div>

        <img src={window.exampleAccount} alt="an illustration of the bottom of a check with the account number on the left and the routing number on the right" width='600'/>
          
        <div>
          <label htmlFor='routing-num'>ROUTING NUMBER {this.showErrors('acct num')}</label>
          <input id='routing-num' type='text' value={this.state.routingNum} onChange={this.updateField('routingNum')}/>
        </div>

        <div>
          <label htmlFor='acct-num'>ACCOUNT NUMBER {this.showErrors('routing num')}</label>
          <input id='acct-num'type='text' value={this.state.acctNum} onChange={this.updateField('acctNum')}/>
        </div>
          
        <div>
          <label htmlFor='acct-num-again'>RE-ENTER ACCOUNT NUMBER</label>
          <input id='acct-num-again' type='text' id='verify-acct-num' onChange={this.updateField('checkAcctNum')}/>
          {this.state.acctNum !== this.state.checkAcctNum && <p className='error'>Account numbers must match.</p>}
        </div>
          
        <button onClick={this.handleSubmit.bind(this)}>Next</button>
      </div>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ExternalAccountForm);