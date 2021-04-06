import React from 'react';
import SplashNavbar from './splash_navbar';

class Splash extends React.Component{
  render(){
    return(
      <div>
        <SplashNavbar />
        <p>This is the splash</p>
      </div>
    )
  }
};

export default Splash;