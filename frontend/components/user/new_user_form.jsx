import React from 'react';
import { createUser } from '../../actions/users_actions';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => {
  return { createUser: userData => dispatch(createUser(userData)) }
};

class NewUserForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {username: '', password: '', fname: '', lname: '', email: '', address: '', phone: ''}
  };

  handleSubmit(e){
    e.preventDefault();
    this.props.createUser(this.state);
  };

  handleChange(field){
    return e => this.setState({ [field]: e.currentTarget.value })
  };

  render(){
    return(
      <div>
        <form>
        <h1>Your Information</h1>
          <label>First Name
            <input type='text' value={this.state.fname} onChange={this.handleChange('fname')} />
          </label>
          <label>Last Name
            <input type='text' value={this.state.lname} onChange={this.handleChange('lname')} />
          </label>
          <label>Email
            <input type='text' value={this.state.email} onChange={this.handleChange('email')} />
          </label>
          <label>Mailing Address
            <textarea value={this.state.address} onChange={this.handleChange('address')} />
          </label>
          <label>Phone
            <input type='text' value={this.state.phone} onChange={this.handleChange('phone')} />
          </label>
        </form>
        <form>
          <h1>Your Account</h1>
          <label>Username
            <input type='text' value={this.state.username} onChange={this.handleChange('username')} />
          </label>
          <label>Password
            <input type='password' value={this.state.password} onChange={this.handleChange('password')} />
          </label>
        </form>
        <button onClick={this.handleSubmit.bind(this)}>Next</button>
      </div>
    )
  }
};

export default connect(null, mapDispatchToProps)(NewUserForm);