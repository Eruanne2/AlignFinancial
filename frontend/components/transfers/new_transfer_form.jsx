import React from 'react';
import { createTransfer } from '../../actions/transfer_actions';
import ExternalAccountForm from '../accounts/external_accounts/external_account_form';
import { withRouter } from 'react-router-dom';
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
      memo: '',
      ready: false,
      externalForm: false
    }
    this.showExternalForm = this.showExternalForm.bind(this);
    this.toggleReady = this.toggleReady.bind(this);
    this.redirect = this.redirect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  updateField(field){
    // debugger
    return e => this.setState({ [field]: e.currentTarget.value })
  }

  showExternalForm(e){
    this.setState({ externalForm: !this.state.externalForm })
  }

  toggleReady(e){
    e.preventDefault();
    this.setState({ ready: !this.state.ready})
  }

  redirect(e){
    e.preventDefault();
    this.props.history.push('/dashboard')
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.createTransfer(this.state);
  }

  render(){
    if (!this.props.accounts) return null;
    if (!this.state.ready) return(
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
        {!this.state.ready && <button onClick={this.showExternalForm}>Link Other Accounts</button>}
        {this.state.externalForm && <ExternalAccountForm/>}
        {this.state.fromAcctId && this.state.toAcctId &&
          <div>
            <label htmlFor='amount-input'>Amount</label>
            <input id='amount-input' type='text' value={this.state.amount} onChange={this.updateField('amount')}/>
            <label htmlFor='memo-input'>memo</label>
            <input id='memo-input' type='text' value={this.state.memo} onChange={this.updateField('memo')}/>
            <p>Optional</p>
            <input type='submit' value='Review Transfer' onClick={this.toggleReady}/>
          </div>
        }
      </div>
    )
    else return (
      <div>
        <h1>Transfers</h1>
        <h2>Review and Submit</h2>
        <section>
          <h3>FROM ACCOUNT</h3>
          <div>
            <p>{this.state.fromAcctId}</p>
            <p>account balance</p>
          </div>
          <h3>TO ACCOUNT</h3>
          <div>
            <p>{this.state.toAcctId}</p>
            <p>account balance</p>
          </div>
        </section>
        <section>
          <h4>Amount</h4>
          <p>{this.state.amount}</p>
          <h4>Memo</h4>
          <p>{this.state.memo}</p>
        </section>
        <section>
          <p>By choosing <span>Submit This Transfer</span>, you authorize this transfer. Once we start the transfer, you can't cancel it.</p>
          <button onClick={this.handleSubmit}>Submit This Transfer</button>
          <button onClick={this.toggleReady}>Edit</button>
          <button onClick={this.redirect}>Cancel</button>
        </section>
      </div>
    )
  }
};

export default withRouter(connect(null, mapDispatchToProps)(NewTransferForm));