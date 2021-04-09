import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ProtectedRoute, AuthRoute } from '../utils/route_utils';
import Splash from './home_guest/splash';
import LoginPage from './home_guest/login_page';
import Dashboard from './home_user/dashboard';
import AccountDetail from './accounts/account_detail';
import ProfilePage from './home_user/profile_page';
import ManageExternalAccounts from './accounts/external_accounts/manage_external_accounts';
import TransferPage from './transfers/transfer_page';
import NewAccountTabs from './accounts/new_account_tabs';
import PageNotFound from './page_not_found';
import Footer from './footer';
import LoginSidebar from './home_guest/login_sidebar';
import SettingsSidebar from './home_user/settings_sidebar';


class App extends React.Component{

  render(){
    return(
      <div className='app-container'>
        <LoginSidebar/>
        <SettingsSidebar/>
        <div id='background-modal'></div>
        <div>
          <Switch>
            <AuthRoute path='/' exact={true} component={Splash}/>
            <AuthRoute path='/login' component={LoginPage}/>
            <ProtectedRoute path='/dashboard' component={Dashboard}/>
            <ProtectedRoute path='/account-detail/:accountId' component={AccountDetail}/>
            <ProtectedRoute path='/profile' component={ProfilePage}/>
            <ProtectedRoute path='/external-accounts' component={ManageExternalAccounts}/>
            <ProtectedRoute path='/transfer' component={TransferPage}/>
            <Route path='/open-account' component={NewAccountTabs}/>
            <Route path='*' component={PageNotFound}/>
          </Switch>
          <Footer />
        </div>
      </div>
    );
  }
};

export default App;
