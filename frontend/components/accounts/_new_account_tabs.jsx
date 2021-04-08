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
        <ul className='tabs'>
          {window.CurrentUser ? <LoginForm/> : <NewUserFormContainer/>}
          <SelectAccount/>
          <p>NEW TRANSFER FORM GOES HERE</p>
        </ul>
      </div>
    )
  }
};

export default NewAccountTabs;