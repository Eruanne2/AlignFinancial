import React from 'react';
import { ProtectedRoute, AuthRoute } from '../utils/route_utils';
import Splash from './home_guest/splash';
import LoginPage from './home_guest/login_page';
import SignupPage from './user/signup_page';
import DummyDash from './home_user/dummy_dash';
import UpdateUserFormContainer from './user/update_user_form_container';


class App extends React.Component{

  render(){
    return(
      <div>
        <h1>Hello from inside the app</h1>
        <AuthRoute path='/' exact={true} component={Splash}/>
        <AuthRoute path='/login' component={LoginPage}/>
        <AuthRoute path='/signup' component={SignupPage}/>
        <ProtectedRoute path='/dashboard' component={DummyDash}/>
        <ProtectedRoute path='/profile' component={UpdateUserFormContainer}/>
      </div>
    );
  }
};

export default App;
