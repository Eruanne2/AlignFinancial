import React from 'react';
import { withRouter } from 'react-router-dom';
import Navbar from '../home_user/navbar';
import SelectAccount from './select_account';
import LoginForm from '../home_guest/_login_form';
import NewUserForm from '../user/new_user_form_container';

class NewAccountTabs extends React.Component {
  constructor(props){
    super(props);

    this.handleNext = this.handleNext.bind(this);
  }

  handleNext(e){
    e.preventDefault();
    let btn = e.currentTarget;
    switch(btn.id){
      case 'to-step-2':
        // submit new user form
        document.getElementById('your-info-section').classList.add('hidden');
        document.getElementById('create-account-section').classList.remove('hidden');
        return
      case 'to-step-3':
        // create new account
        document.getElementById('create-account-section').classList.add('hidden');
        document.getElementById('fund-account-section').classList.remove('hidden');
        return
      case 'to-dashboard':
        this.props.history.push('/');
        return
      default:
        return;
    }
  };

  render(){
    return(
      <div className='tabs-container'>
        <Navbar />
        <ul className='step-nav'>
          <h3>1. Your Information</h3>
          <h3>2. Open Account</h3>
          <h3>3. Fund Account</h3>
        </ul>
        <ul className='tabs'>
          <section id='your-info-section'>
            {window.currentUser ? <LoginForm/> : <NewUserForm/>}
            <button id='to-step-2' onClick={this.handleNext}>Next</button>
          </section>
          <section id='create-account-section' className='hidden' >
            <SelectAccount/>
            <button id='to-step-3' onClick={this.handleNext}>Next</button>
          </section>
          <section id='fund-account-section' className='hidden'>
            <p>NEW TRANSFER FORM GOES HERE</p>
            <button id='to-dashboard' onClick={this.handleNext}>Next</button>
          </section>
        </ul>
      </div>
    )
  }
};

export default withRouter(NewAccountTabs);