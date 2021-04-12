import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import configureStore from './store/store';
import App from './components/app';

//testing
import * as uiActions from './actions/ui_actions';
import * as sessionActions from './actions/session_actions';
import * as usersActions from './actions/users_actions';
import * as usersApi from './utils/users_api';
import * as accountsApi from './utils/accounts_api';
import * as accountsActions from './actions/account_actions';
import * as transfersApi from './utils/transfers_api';
import * as transfersActions from './actions/transfer_actions';

const Root = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  let store;
  if (window.currentUser){
    const preloadedState = { 
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: { id: window.currentUser.id }
    };
    store = configureStore(preloadedState);
  }
  else store = configureStore();

  ReactDOM.render(<Root store={store}/>, root);

  // testing
  window.uiActions = uiActions;
  window.sessionActions = sessionActions;
  window.usersActions = usersActions;
  window.usersApi = usersApi;
  window.accountsApi = accountsApi;
  window.accountsActions = accountsActions;
  window.transfersApi = transfersApi;
  window.transfersActions = transfersActions;
  window.store = store;
});