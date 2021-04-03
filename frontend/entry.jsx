import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';

const Root = () => (
  <App />
);

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  ReactDOM.render(<Root/>, root);
});