import React from 'react';
import { ProtectedRoute, AuthRoute } from '../utils/route_utils';
import DummyDash from './home_user/dummy_dash';
import Splash from './home_guest/splash';
import LoginPage from './home_guest/login_page';


class App extends React.Component{

  render(){
    return(
      <div>
        <h1>Hello from inside the app</h1>
        <AuthRoute path='/' exact={true} component={Splash}/>
        <AuthRoute path='/login' component={LoginPage}/>
        {/* <AuthRoute path='/signup' component={SignupPage}/> */}
        <ProtectedRoute path='/dashboard' component={DummyDash}/>
      </div>
    );
  }
};

export default App;
