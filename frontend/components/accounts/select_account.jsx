import React from 'react';
import { createAccount } from '../../actions/account_actions';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { account: { acctType: '', userId: state.session.id, external: false } }
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
    this.props.createAccount(this.state)
    if (!!this.props.updateParent) {
      this.props.updateParent(3);
    }
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
      <div className='select-accts-container'>
        <form>
          <div className='account-selections'>
            <button onClick={this.handleSelection('checkings')}>
              <img src={window.selectChecking} height={115} alt="the word 'align' in purple lettering on a white background"/>
            </button>
            <button onClick={this.handleSelection('savings')}>
              <img src={window.selectSavings} height={115} alt="the word 'align' in purple lettering on a white background"/>
            </button>
            <button onClick={this.handleSelection('money market')}>
              <img src={window.selectMM} height={115} alt="the word 'align' in purple lettering on a white background"/>
            </button>
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