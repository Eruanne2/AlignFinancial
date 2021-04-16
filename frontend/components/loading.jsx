import React from 'react';
import Navbar from './home_user/navbar';

function Loading(props) {
  return(
    <div className='loading'>
      <Navbar/>
      <div>
        <h1></h1>
        <p></p>
        <span></span>
        <span></span>
      </div>
    </div>
  )
};

export default Loading;