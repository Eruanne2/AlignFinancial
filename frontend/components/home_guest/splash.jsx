import React from 'react';
import SplashNavbar from './splash_navbar';

class Splash extends React.Component{
  render(){
    return(
      <div>
        <SplashNavbar />
        <section className='better-banking-panel'>
          <p>better banking starts <span>here.</span></p>
        </section>
      </div>
    )
  }
};

export default Splash;