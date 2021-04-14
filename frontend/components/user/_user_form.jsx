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
      return fieldErrors;
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
        <form>
          <h1>Your Information</h1>
          <span className='error'>
            {this.showErrors('fname').length > 0 ? <i><FontAwesomeIcon icon={faExclamationCircle}/></i> : null }
            {this.showErrors('fname')}
          </span>
          <label>First Name
            <input type='text' value={this.state.fname} onChange={this.handleChange('fname')} />
          </label>
          <span className='error'>
            {this.showErrors('lname').length > 0 ? <i><FontAwesomeIcon icon={faExclamationCircle}/></i> : null }
            {this.showErrors('lname')}
          </span>
          <label>Last Name
            <input type='text' value={this.state.lname} onChange={this.handleChange('lname')} />
          </label>
          <span className='error'>
            {this.showErrors('email').length > 0 ? <i><FontAwesomeIcon icon={faExclamationCircle}/></i> : null }
            {this.showErrors('email')}
          </span>
          <label>Email
            <input type='text' value={this.state.email} onChange={this.handleChange('email')} />
          </label>
          <span className='error'>
            {this.showErrors('address').length > 0 ? <i><FontAwesomeIcon icon={faExclamationCircle}/></i> : null }
            {this.showErrors('address')}
          </span>
          <label>Mailing Address
            <textarea value={this.state.address} onChange={this.handleChange('address')} />
          </label>
          <span className='error'>
            {this.showErrors('phone').length > 0 ? <i><FontAwesomeIcon icon={faExclamationCircle}/></i> : null }
            {this.showErrors('phone')}
          </span>
          <label>Phone
            <input type='text' value={this.state.phone} onChange={this.handleChange('phone')} />
          </label>
        </form>
        <form>
          <h1>Your Account</h1>
          <span className='error'>
            {this.showErrors('username').length > 0 ? <i><FontAwesomeIcon icon={faExclamationCircle}/></i> : null }
            {this.showErrors('username')}
          </span>
          <label>Username
            <input type='text' value={this.state.username} onChange={this.handleChange('username')} />
          </label>
          <span className='error'>
            {this.showErrors('password').length > 0 ? <i><FontAwesomeIcon icon={faExclamationCircle}/></i> : null }
            {this.showErrors('password')}
          </span>
          <label>Password
            <input type='password' value={this.state.password} onChange={this.handleChange('password')} />
          </label>
        </form>
        <button onClick={this.handleSubmit.bind(this)}>{this.props.submitText}</button>
      </div>
    )
  }
};

export default withRouter(UserForm);