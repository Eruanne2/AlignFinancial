import React from 'react';
import SplashNavbar from './splash_navbar';

class Splash extends React.Component{
  render(){
    return(
      <div>
        <SplashNavbar />
        <section className='better-banking-panel'>
          <p>This is the splash</p>
        </section>
      </div>
    )
  }
};

export default Splash;