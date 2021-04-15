import React from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

class UserForm extends React.Component{
  constructor(props){
    super(props);
    this.state = this.props.userData;
  };

  showErrors(field){
    let fieldErrors = [];
    this.props.errors.forEach(error => {
      if (error.toLowerCase().includes(field)) fieldErrors.push(error);
    });
    return fieldErrors.map(error => {
      if (error.includes('Fname')) return error.replace('Fname', 'First name');
      if (error.includes('Lname')) return error.replace('Lname', 'Last name');
      if (error.includes('Address')) return error.replace('Address', 'Mailing address');
      if (error.includes('Phone')) return error.replace('Phone', 'Phone number');
      if (fieldErrors.length < 1) return '';
      else return <span className='error' key={Math.floor(Math.random() * 1000)}>
        <i><FontAwesomeIcon icon={faExclamationCircle}/></i>
        {fieldErrors}
      </span>
    });
  };

  handleSubmit(e){
    e.preventDefault();
    this.props.processUser(this.state).then(this.successfulSubmit.bind(this));
  };

  successfulSubmit(){
    if (!!this.props.updateParent) this.props.updateParent(2);
    if (this.props.submitText === 'Update' && this.showErrors('fname').length < 1) {
      this.setState({ updatePopup: true})
    }
  };

  handleChange(field){
    return e => this.setState({ [field]: e.currentTarget.value })
  };

  render(){
    return(
      <div className='user-form-container'>
        {!!this.state.updatePopup && 
          <div className='update-complete-popup'>
            <i><FontAwesomeIcon icon={faCheckCircle}/></i>
            <p>Your account has been updated successfully.</p>
          </div>
        }
        <h1>Your Information</h1>
        <form>
          <ul className='labels-list'>
            <li><label htmlFor='fname-input' >First Name</label></li>
            <li><label htmlFor='lname-input'>Last Name</label></li>
            <li><label htmlFor='email'>Email</label></li>
            <li><label htmlFor='address-input'>Mailing Address</label></li>
            <li><label htmlFor='phone-input'>Phone</label></li>
          </ul>
          <ul className='inputs-list'>
            <li>
              {this.showErrors('fname')}
              <input id='fname-input' type='text' value={this.state.fname} onChange={this.handleChange('fname')} />
            </li>
            <li>
              {this.showErrors('lname')}
              <input id='lname-input' type='text' value={this.state.lname} onChange={this.handleChange('lname')} />
            </li>
            <li>
              {this.showErrors('email')}
              <input id='email-input' type='text' value={this.state.email} onChange={this.handleChange('email')} />
            </li>
            <li>
              {this.showErrors('address')}
              <textarea id='address-input' value={this.state.address} onChange={this.handleChange('address')} />
            </li>
            <li>
              {this.showErrors('phone')}
              <input id='phone-input' type='text' value={this.state.phone} onChange={this.handleChange('phone')} />
            </li>
          </ul>
        </form>

        <h1>Your Account</h1>
        <form>
          <ul className='labels-list'>
            <li><label htmlFor='user-username-input'>Username</label></li>
            <li><label htmlFor='user-password-input'>Password</label></li>
          </ul>
          <ul className='inputs-list'>
            <li>
              {this.showErrors('username')}
              <input id='user-username-input' type='text' value={this.state.username} onChange={this.handleChange('username')} />
            </li>
            <li>
              {this.showErrors('password')}
              <input id='user-password-input' type='password' value={this.state.password} onChange={this.handleChange('password')} />
            </li>
          </ul>
        </form>
        <button onClick={this.handleSubmit.bind(this)}>{this.props.submitText}</button>
      </div>
    )
  }
};

export default withRouter(UserForm);