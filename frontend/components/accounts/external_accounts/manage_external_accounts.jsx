import React from 'react';
import Navbar from '../../home_user/navbar';
import ExternalAccountForm from './external_account_form';

class ManageExternalAccounts extends React.Component{
  render(){
    return(
      <div>
        <Navbar/>
        <h1>display `AccountsIndex` of user's external accounts here</h1>
        '<h1>Link a new external account' button which toggles form</h1>
        <ExternalAccountForm/>
      </div>
    )
  }
};

export default ManageExternalAccounts;