import React from 'react';
import Navbar from '../home_user/navbar';
import UpdateUserFormContainer from './update_user_form_container';

function ProfilePage(props){
  return(
    <div>
      <Navbar/>
      <UpdateUserFormContainer/>
    </div>
  )
};

export default ProfilePage;