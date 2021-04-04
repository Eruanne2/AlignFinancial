import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import configureStore from './store/store';
import App from './components/app.jsx';

//testing
import * as sessionActions from './actions/session_actions';
import * as usersActions from './actions/users_actions';
import * as usersApi from './utils/users_api';

const Root = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <App/>
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


  window.sessionActions = sessionActions;
  window.usersActions = usersActions;
  window.usersApi = usersApi;
  window.store = store;
});