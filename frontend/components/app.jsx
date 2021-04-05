import React from 'react';
import { connect } from 'react-redux';
import { ProtectedRoute, AuthRoute } from '../utils/route_utils';
import NavbarContainer from './home_user/navbar_container';
import SplashNavbar from './home_guest/splash_navbar';
import LoginForm from './home_guest/login_form';

const mapStateToProps = state => {
  return { currentUser: state.session.id }
};

class App extends React.Component{
  whichNav(){
    return (this.props.currentUser) ? <NavbarContainer /> : <SplashNavbar />
  };

  render(){
    return(
      <div>
        {this.whichNav()}
        <h1>Hello from inside the app</h1>
        <AuthRoute path='/login' component={LoginForm}/>
      </div>
    );
  }
};

export default connect(mapStateToProps)(App);
