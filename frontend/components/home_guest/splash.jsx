import React from 'react';
import SplashNavbar from './splash_navbar';
import { Link } from 'react-router-dom';

class Splash extends React.Component{
  render(){
    return(
      <div>
        <SplashNavbar />
        <section className='better-banking-panel'>
          <p>better banking starts <span>here.</span></p>
          <p>It’s not about finding a place for your money, it’s about finding</p>
          <p>the right place for your money.</p>
          <Link to='/open-account'>Open Account</Link>
        </section>
      </div>
    )
  }
};

export default Splash;