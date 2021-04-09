import React from 'react';
import SplashNavbar from './splash_navbar';

class Splash extends React.Component{
  render(){
    return(
      <div>
        <SplashNavbar />
        <section className='better-banking-panel'>
          <h1>better banking starts <span>here.</span></h1>
          <p>It’s not about finding a place for your money, it’s about finding</p>
          <p>the right place for your money.</p>
        </section>
      </div>
    )
  }
};

export default Splash;