import React from 'react';
import Navbar from '../home_user/navbar';
import LoginForm from './_login_form';

class LoginPage extends React.Component{
  render(){
    return(
      <div>
        <Navbar />
        <LoginForm/>
      </div>
    )
  };
};

export default LoginPage;