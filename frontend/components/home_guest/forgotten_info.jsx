import React from 'react';
import Navbar from '../home_user/navbar';

class ForgottenInfoPage extends React.Component{
  constructor(props){
    super(props);
    this.state = { 
      userEmail: '',
      userUsername: '', // look up user's email by username
      validEmail: true 
    }
  }


  isValidEmail() {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(this.state.userEmail);
  }

  handleChange(e) {
    this.setState({userEmail: e.currentTarget.value}, 
      () => this.setState({validEmail: this.isValidEmail()})
    );
  }

  sendEmail() {
    Email.send({
      Host: "smtp.gmail.com",
      Username: "alignbank@gmail.com",
      Password: "UnsafePassword",
      To: this.state.userEmail,
      From: "alignbank@gmail.com",
      Subject: "Sending Email using javascript",
      Body: "Well that was easy!!",
    })
      .then(function (message) {
        alert(`Username sent to ${this.state.userEmail}`)
      });
  }

  render(){

    return (this.props.match.params.forgotten === 'password') ?
      <div>
        <Navbar/>
        <div className='forgot-password'>
          <h1>Forgotten Password</h1>
          <em>Remember your passwords better.</em>
          <p>It can't be that hard, right?</p>
          <p>As a consequence of your negligence, your account has been seized and all funds transfered to the Align Bank CEO's personal account. Please create a new account and deposit more money. </p>
        </div>
      </div>
    :
    <div>
      <Navbar />
      <div className='forgot-username'>
        <h1>Forgotten Username</h1>
        <h2>Please enter the email address associated with your account: <i>i</i></h2>
        <input type='text' className={this.state.validEmail ? '' : 'bad-email'} onChange={this.handleChange.bind(this)}/>
        <button className={this.state.validEmail ? '' : 'bad-email'} onClick={this.sendEmail.bind(this)}>Send Username</button>
      </div>
    </div>
  };
};

export default ForgottenInfoPage;