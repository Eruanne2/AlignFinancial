import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';

const mapDispatchToProps = dispatch => {
  return { login: userCreds => dispatch(login(userCreds)) }
};


class LoginForm extends React.Component{
  constructor(props){
    super(props);
    this.state = { username: '', password: ''};
  };

  handleSubmit(e){
    e.preventDefault();
    this.props.login(this.state);
  };

  handleChange(field){
    return e => this.setState({ [field]: e.currentTarget.value })
  };

  render(){
    return(
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Username
            <input type='text' value={this.state.username} onChange={this.handleChange('username')}/>
          </label>
          <label>Password
            <input type='password' value={this.state.password} onChange={this.handleChange('password')}/>
          </label>
          <input type='submit' value='Log In'/>
          <label>Save Username(dead)
            <input type='checkbox'/>
          </label>
        </form>
        <p>Forgot username or password? We'll have a hover popup that says 'well, too bad. remember better'.</p>
      </div>
    )
  };
};

export default connect(null, mapDispatchToProps)(LoginForm);