import React from 'react';
import SplashNavbar from './splash_navbar';
import { Link } from 'react-router-dom';

class Splash extends React.Component{
  render(){
    return(
      <div>
        <SplashNavbar />
        <section className='better-banking-panel'>
          <h1>better banking starts <span>here.</span></h1>
          <p>It’s not about finding a place for your money, it’s about finding</p>
          <p>the right place for your money.</p>
          <Link to='/open-account'><button>Open Account</button></Link>

        </section>
      </div>
    )
  }
};

export default Splash;