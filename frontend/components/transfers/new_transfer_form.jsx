import React from 'react';
import { createTransfer } from '../../actions/transfer_actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { formatMoney } from '../../utils/formatting_util';
import { clearErrors } from '../../actions/ui_actions';

const mapStateToProps = state => {
  return { 
    transferErrors: state.errors.transferErrors,
    transfers: state.entities.transfers
  }
}

const mapDispatchToProps = dispatch => {
  return { 
    createTransfer: acctData => dispatch(createTransfer(acctData)),
    clearErrors: () => dispatch(clearErrors())
   }
};

class NewTransferForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fromAcctId: 0,
      toAcctId: this.props.defaultToAcct || 0,
      amount: '0',
      memo: '',
      ready: false,
      externalAcctPopup: false
    }
    
    this.toggleReady = this.toggleReady.bind(this);
    this.redirect = this.redirect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  updateField(field){  
    return e =>  this.setState({ [field]: e.currentTarget.value }) 
  }

  toggleReady(e){
    e.preventDefault();
    this.props.clearErrors();
    this.setState({ ready: !this.state.ready})
  }
  
  redirect(e){
    e.preventDefault();
    this.props.history.push('/dashboard')
  }
  
  handleSubmit(e){
    e.preventDefault();
    this.props.createTransfer(this.state)
      .then(res => {this.props.history.push('/dashboard')})
  }
  
  checkAccountsFilled(){
    if (this.state.fromAcctId && this.state.toAcctId) return true;
    else return false;
  }

  formatDate(date){
    date = date.toDateString();
    return (date.slice(4,10) + ',' + date.slice(10)).toUpperCase();
  };

  getRemainingTransfers(acct){
    let transfers = Object.values(this.props.transfers);
    let count = transfers.filter(transfer => 
      transfer.fromAcctId === acct.id && transfer.createdAt.includes(new Date().toISOString().slice(0,7))
    ).length
    return count < 6 ? (acct.transferLimit - count) : 'no'
  }

  render(){
    if (!this.props.accounts) return null;
    if (!this.state.ready) return(
      <div className='transfer-form-container'>
        {this.state.externalAcctPopup &&
        <div className='external-acct-popup'>
          <i><FontAwesomeIcon icon={faLink}/></i>
          <p><em>Want to link an account at another institution?</em> Go to <Link to='/external-accounts'>Manage Linked Accounts</Link>, add the account, and return to make your transfer.</p>
        </div>
        }

        <h1>Transfers</h1>

        <ul>
          <label htmlFor='select-from-acct'>FROM ACCOUNT</label>
          <select id='select-from-acct' value={this.state.fromAcctId} onChange={this.updateField('fromAcctId')}>
            <option key={2000} value={0} >Select an Account</option>
            {Object.values(this.props.accounts).map((acct, idx) => {
              if (acct.userId === window.currentUser.id) {
                return <option key={idx} value={acct.id} >{acct.nickname}????????????{acct.acctNum % 10000}{acct.external ? '' : '  ' + formatMoney(acct.balance)}</option>
              }
            })}
          </select>
        </ul>
        
        <ul>
          <label htmlFor='select-to-acct'>TO ACCOUNT</label>
          <select id='select-to-acct' value={this.state.toAcctId} onChange={this.updateField('toAcctId')} >
            <option key={2000} value={0} >Select an Account</option>
            {Object.values(this.props.accounts).map((acct, idx) => {
              if (acct.userId === window.currentUser.id && acct.id != this.state.fromAcctId) {
                return <option key={idx} value={acct.id}>{acct.nickname}????????????{acct.acctNum % 10000}{acct.external ? '' : '  ' + formatMoney(acct.balance)}</option>
              }
            })}
          </select>
        </ul>
        <br/>
        
        {!this.state.ready && 
          <button id='link-accts-btn' onClick={e=>this.setState({externalAcctPopup: true})}>+Link Other Accounts</button>
        }
        {this.checkAccountsFilled() &&
          <div className='transfer-form-inputs'>
            <label htmlFor='amount-input'>Amount</label>
            <input id='amount-input' type='text' value={this.state.amount} onChange={this.updateField('amount')}/>
            <p>{formatMoney(this.state.amount)}</p>
            <label htmlFor='memo-input'>Memo (optional)</label>
            <input id='memo-input' type='text' value={this.state.memo} onChange={this.updateField('memo')}/>
            <div className='transfer-submits'>
              <input type='submit' value='Review Transfer' onClick={this.toggleReady}/>
              <button onClick={e => this.props.history.push('/dashboard')}>Cancel</button>
            </div>
          </div>
        }
      </div>
    )
    else {
      let fromAcct = this.props.accounts[this.state.fromAcctId]
      let toAcct = this.props.accounts[this.state.toAcctId]
      return (
        <div className='transfer-review-container'>
          <h1>Transfers</h1>
          <h2>Review and Submit</h2>
          <section className='acct-review'>
            <section>
              <h3>FROM ACCOUNT</h3>
              <div>
                <p>{fromAcct.nickname}????????????{fromAcct.acctNum % 10000}{fromAcct.external ? '' : '  ' + formatMoney(fromAcct.balance)}</p>
                <p>{fromAcct.external ? 'External Account' : '  ' + formatMoney(fromAcct.balance)}</p>
              </div>
            </section>
            <section>
              <h3>TO ACCOUNT</h3>
              <div>
                <p>{toAcct.nickname}????????????{toAcct.acctNum % 10000}{toAcct.external ? '' : '  ' + formatMoney(toAcct.balance)}</p>
                <p>{toAcct.external ? 'External Account' : '  ' + formatMoney(toAcct.balance)}</p>
              </div>
            </section>
          </section>
          <section className='review-transfer-details'>
            <ul>
              <h4>Amount:</h4>
              <h4>Memo:</h4>
              <h4>Date Requested:</h4>
            </ul>
            <ul>
              <p>{this.state.amount}</p>
              <p id='memo-text'>"{this.state.memo}"</p>
              <p>{this.formatDate(new Date())}</p>
            </ul>
          </section>
          <section className='review-submit'>
            {(fromAcct.acctType !== 'checkings' && !fromAcct.external)&& 
              <p className={[3,4,5,6].includes(this.getRemainingTransfers(fromAcct)) ? '' : 'error'}>
                {fromAcct.nickname}({fromAcct.acctNum % 10000}) has <span>&nbsp;{this.getRemainingTransfers(fromAcct)}&nbsp;</span> transfers remaining for {new Date().toLocaleString('default', { month: 'long' })}.
              </p>
            }
            <p>By choosing <span>Submit This Transfer</span>, you authorize this transfer. Once we start the transfer, you can't cancel it.</p>
            <button onClick={this.handleSubmit}>Submit This Transfer</button>
            <button onClick={this.toggleReady}>Edit</button>
            <button onClick={this.redirect}>Cancel</button>
            {this.props.transferErrors && <p className='error'>{this.props.transferErrors}</p>}

          </section>
        </div>
      )
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewTransferForm));