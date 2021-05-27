

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import configureStore from './store/store';
import App from './components/app';

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
      session: { 
        id: window.currentUser.id, 
        lastLogin: new Date(window.lastLogin.replace(/-/g, '/').replace(' /', ' -')),
        currentLogin: new Date()
      }
    };
    store = configureStore(preloadedState);
  }
  else store = configureStore();

  ReactDOM.render(<Root store={store}/>, root);

});