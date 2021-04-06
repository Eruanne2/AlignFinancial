import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ProtectedRoute, AuthRoute } from '../utils/route_utils';
import Splash from './home_guest/splash';
import LoginPage from './home_guest/login_page';
import SignupPage from './user/signup_page';
import Dashboard from './home_user/dashboard';
import ProfilePage from './home_user/profile_page';
import PageNotFound from './page_not_found';
import Footer from './footer';


class App extends React.Component{

  render(){
    return(
      <div>
        <Switch>
          <AuthRoute path='/' exact={true} component={Splash}/>
          <AuthRoute path='/login' component={LoginPage}/>
          <AuthRoute path='/signup' component={SignupPage}/>
          <ProtectedRoute path='/dashboard' component={Dashboard}/>
          <ProtectedRoute path='/profile' component={ProfilePage}/>
          <Route path='*' component={PageNotFound}/>
        </Switch>
        <Footer />
      </div>
    );
  }
};

export default App;
