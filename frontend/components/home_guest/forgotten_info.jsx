import React from 'react';
import Navbar from '../home_user/navbar';
import { Link } from 'react-router-dom';
import { getAllUsers } from '../../utils/users_api';

class ForgottenInfoPage extends React.Component{
  constructor(props){
    super(props);
    this.state = { 
      userEmail: '',
      validEmail: true,
      loading: false,
      infoTooltip: false
    }
    this.users = {};
  }

  componentDidMount() {
    getAllUsers().then(res => this.users = res )
  }

  toggleTooltip(){
    this.setState({ infoTooltip: !this.state.infoTooltip })
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
    this.setState({loading: true})
    let user = Object.values(this.users).filter(user => user.email === this.userEmail )[0];
    let body = user ? 
      `Your username is ${user.username}.` 
      :
      '<h1>Forgot Username</h1> <p>Oops, looks like this email isn\'t associated with an Align Bank account. To create one, \
      check us out <a href="https://align-financial.herokuapp.com/#/">here</a>!</p> <br/> <h2>All right, in all \
      seriousness...</h2> <p>Thank you so much for taking the time to check out my website! I\'d love to hear what \
      you thought. Feel free to shoot me an email at charis.ginn222@gmail.com or message me on \
      <a href="https://www.linkedin.com/in/charis-ginn-9abb93173">LinkedIn</a>.</p> <br/> <p>If you are a recruiter, \
      feel free to checkout my <a href="www.charisginn.com">portfolio website</a> as well!</p> <p>Best,</p> <h3>Charis</h3>'
    let toEmail = this.state.userEmail;
    let that = this;

    Email.send({
      Host: "smtp.gmail.com",
      Username: "alignbank@gmail.com",
      Password: "UnsafePassword",
      To: toEmail,
      From: "alignbank@gmail.com",
      Subject: "Align Bank Forgotten Username Request",
      'MIME-Version': '1.0rn',
      'Content-Type': "text/html; charset=ISO-8859-1rn",
      Body: body
    })
      .then(function (message) {
        that.setState({loading: false})
        alert(`Username sent to ${toEmail}`)
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
          <button><Link to="/open-account">Open Account</Link></button>
        </div>
      </div>
    :
    <div>
      <div className='hidden' id='email-info-tooltip'>
        <div className='arrow-holder'><span id='dropdown-arrow'></span></div>
        <p>Feel free to enter a real email address here. This information will not be saved, and you will receive an email even if the email is not associated with an account.</p>
      </div>
      <Navbar />
      <div className='forgot-username'>
        <h1>Forgotten Username</h1>
        <h2>Please enter the email address associated with your account: <div className='icon-holder' onMouseOver={this.toggleTooltip} onMouseOut={this.toggleTooltip}><i className='circle-icon'>i</i></div></h2>
        <input type='text' className={this.state.validEmail ? '' : 'bad-email'} onChange={this.handleChange.bind(this)}/>
        <button 
          className={this.state.validEmail ? '' : 'bad-email'} 
          disabled={!this.state.validEmail} 
          onClick={this.sendEmail.bind(this)}
        >
          Send Username
        </button>
        {this.state.loading && <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
      </div>
    </div>
  };
};

export default ForgottenInfoPage;