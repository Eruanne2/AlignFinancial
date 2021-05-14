import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './home_user/navbar';

function PageNotFound(props){
  const link = window.currentUser ? <Link to ='/dashboard'>dashboard</Link> : <Link to ='/'>home page</Link>
  return(
    <div className='page-not-found'>
      <Navbar/>
      <h1>404</h1>
      <h3>Hmm, we can't seem to find that page. Head back to the {link} and see if you can find it there.</h3>
    </div>
  )
};

export default PageNotFound;