import React from 'react';
import Navbar from '../home_user/navbar';

class ForgottenInfoPage extends React.Component{
  constructor(props){
    super(props);
    this.userEmail = ''
    this.userUsername = ''; // look up user's email by username
  }

  sendEmail() {
    Email.send({
      Host: "smtp.gmail.com",
      Username: "alignbank@gmail.com",
      Password: "UnsafePassword",
      To: "bluegrassgal2222@gmail.com",
      From: "alignbank@gmail.com",
      Subject: "Sending Email using javascript",
      Body: "Well that was easy!!",
    })
      .then(function (message) {
        alert(`Username sent to ${this.userEmail}`)
      });
  }

  render(){

    return (this.props.forgotten === 'password') ?
      <div>
        <h1>Remember your passwords better.</h1>
        <p>As a consequence of your negligence, your account has been seized and all funds transfered to the owner's personal account. Please create a new account and deposit more money. </p>
      </div>
    :
      <div>
        <Navbar />
        <h2>Please enter the email address associated with your account: <i>i</i></h2>
        <input type='text' onChange={e => this.userEmail = e.currentTarget.value}/>
        <button onClick={this.sendEmail.bind(this)}>Send Username</button>
      </div>
  };
};

export default ForgottenInfoPage;