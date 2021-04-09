import React from 'react';
import Navbar from '../home_user/navbar';
import SelectAccount from './select_account';
import LoginForm from '../home_guest/_login_form';
import NewUserFormContainer from '../user/new_user_form_container';

class NewAccountTabs extends React.Component {
  render(){
    return(
      <div className='tabs-container'>
        <Navbar />
        <ul className='steps'>
          <h3>1. Your Information</h3>
          <h3>2. Open Account</h3>
          <h3>3. Fund Account</h3>
        </ul>
        <ul className='tabs'>
          {window.currentUser ? <LoginForm/> : <NewUserFormContainer/>}
          <SelectAccount/>
          <p>NEW TRANSFER FORM GOES HERE</p>
        </ul>
      </div>
    )
  }
};

export default NewAccountTabs;