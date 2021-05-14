import React from 'react';
import IdleTimer from 'react-idle-timer'
import { logout } from '../actions/session_actions';
import { Switch, Route } from 'react-router-dom';
import { ProtectedRoute, AuthRoute } from '../utils/route_utils';
import Splash from './home_guest/splash';
import LoginPage from './home_guest/login_page';
import Dashboard from './home_user/dashboard';
import AccountDetail from './accounts/account_detail';
import ProfilePage from './home_user/profile_page';
import ManageExternalAccounts from './accounts/external_accounts/manage_external_accounts';
import TransferPage from './transfers/transfer_page';
import OpenAccountPage from './accounts/open_account_page';
import PageNotFound from './page_not_found';
import Footer from './footer';
import LoginSidebar from './home_guest/login_sidebar';
import SettingsSidebar from './home_user/settings_sidebar';
import { connect } from 'react-redux';
import { toggleSidebar } from '../actions/ui_actions';

const mapDispatchToProps = dispatch => {
  return { 
    logout: () => dispatch(logout()),
    toggleSidebar: () => dispatch(toggleSidebar())
  }
}

class App extends React.Component{
  constructor(props) {
    super(props);
    this.idleTimer = null;
    this.handleOnIdle = this.handleOnIdle.bind(this);
  }

  handleOnIdle(e){
    if (window.currentUser) this.props.logout();
  }

  clickAwaySidebar(e){
    if (e.target === document.getElementById('background-modal')) {
      e.preventDefault();
      document.querySelector('.sidebar').classList.add('close-sidebar-animate');
      setTimeout(this.props.toggleSidebar, 300);
    }
  }

  render(){
    return(
      <div>
        <IdleTimer
          ref={ref => { this.idleTimer = ref }}
          timeout={1000 * 90 }
          onActive={this.handleOnActive}
          onIdle={this.handleOnIdle}
          onAction={this.handleOnAction}
          debounce={250}
        />
        <div className='app-container'>
          <LoginSidebar/>
          <SettingsSidebar/>
          <div id='background-modal' onClick={this.clickAwaySidebar.bind(this)}></div>
          <div>
            <Switch>
              <AuthRoute path='/' exact={true} component={Splash}/>
              <AuthRoute path='/login' component={LoginPage}/>
              <ProtectedRoute path='/dashboard' component={Dashboard}/>
              <ProtectedRoute path='/account-detail/:accountId' component={AccountDetail}/>
              <ProtectedRoute path='/profile' component={ProfilePage}/>
              <ProtectedRoute path='/external-accounts' component={ManageExternalAccounts}/>
              <ProtectedRoute path='/transfer' component={TransferPage}/>
              <Route path='/open-account' component={OpenAccountPage}/>
              <Route path='*' component={PageNotFound}/>
            </Switch>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
};

export default connect(null, mapDispatchToProps)(App);
