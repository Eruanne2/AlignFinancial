import React from 'react';
import { createTransfer } from '../../actions/transfer_actions';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => {
  return { createTransfer: acctData => dispatch(createTransfer(acctData)) }
};

class NewTransferForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fromAcctId: 0,
      toAcctId: 0,
      amount: 0,
      memo: ''
    }
  };

  updateField(field){
    // debugger
    return e => this.setState({ [field]: e.currentTarget.value })
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.createTransfer(this.state);
  }

  render(){
    if (!this.props.accounts) return null;
    return(
      <div className='transfer-form-container'>
        <h1>Transfers</h1>
        <label>FROM ACCOUNT
          <select onChange={this.updateField('fromAcctId')}>
            <option key={2000} value={0} >Select an Account</option>
            {this.props.accounts.map((acct, idx) => {
              if (acct.userId === window.currentUser.id) {
                return <option key={idx} value={acct.id} >{acct.nickname}••••{acct.acctNum % 10000}</option>
              }
            })}
          </select>
        </label>
        <label>TO ACCOUNT
          <select onChange={this.updateField('toAcctId')}>
            <option key={2000} value={0} >Select an Account</option>
            {this.props.accounts.map((acct, idx) => {
              if (acct.userId === window.currentUser.id && acct.id != this.state.fromAcctId) {
                return <option key={idx} value={acct.id} >{acct.nickname}••••{acct.acctNum % 10000}</option>
              }
            })}
          </select>
        </label>
        {this.state.fromAcctId && this.state.toAcctId &&
          <div>
            <label htmlFor='amount-input'>Amount</label>
            <input id='amount-input' type='text' value={this.state.amount} onChange={this.updateField('amount')}/>
            <label htmlFor='memo-input'>memo</label>
            <input id='memo-input' type='text' value={this.state.memo} onChange={this.updateField('memo')}/>
            <input type='submit' value='Review Transfer'/>
          </div>
        }
      </div>
    )
  }
};

export default connect(null, mapDispatchToProps)(NewTransferForm);