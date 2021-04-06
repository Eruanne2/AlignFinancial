import React from 'react';
import { Route } from 'react-router-dom';
import Navbar from '../home_user/navbar';
import NewUserForm from './new_user_form';

class SignupPage extends React.Component{
  render(){
    return(
      <div>
        <Navbar />
        <Route path='/signup/create-user'component={NewUserForm}/>
        {/* <Route path='/signup/open-account'/> */}
        {/* <Route path='/signup/deposit'/> */}
      </div>
    )
  };
};

export default SignupPage;