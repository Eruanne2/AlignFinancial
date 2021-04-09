import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

/*

The FontAwesomeIcon component in the return
*/

const mapStateToProps = state => {
  return { errors: state.errors.sessionErrors }
};

const mapDispatchToProps = dispatch => {
  return { login: userCreds => dispatch(login(userCreds)) }
};


class LoginForm extends React.Component{
  constructor(props){
    super(props);
    this.state = { username: '', password: ''};
  };

  userLogin(e){
    e.preventDefault();
    this.props.login(this.state);
  };

  handleChange(field){
    return e => this.setState({ [field]: e.currentTarget.value })
  };

  demoLogin(e){
    e.preventDefault();
    this.props.login({ username: 'DemoUser', password: 'password'});
  };

  render(){
    return(
      <div className='login-form-container'>
          <div className='demo-login'>
            <h1>Login</h1>
            <p>or</p>
            <button onClick={this.demoLogin.bind(this)}>Demo Log In</button>
          </div>
        <form onSubmit={this.userLogin.bind(this)}>
          <span className='error'>
            {this.props.errors.length > 0 ? <i><FontAwesomeIcon icon={faExclamationCircle}/></i> : null }
            {this.props.errors}
          </span>
          <section className='login-inputs'>
            <div className='labels'>
              <label htmlFor='login-username'>Username</label>
              <label htmlFor='login-password'>Password</label>
            </div>
            <div className='inputs'>
              <input id='login-username' type='text' value={this.state.username} onChange={this.handleChange('username')}/>
              <input id='login-password' type='password' value={this.state.password} onChange={this.handleChange('password')}/>
            </div>
          </section>
          <section className='submit-btns'>
            <div className='user-login'>
              <input type='submit' value='Log In'/>
              <label>
                <input type='checkbox'/>Save Username {/* Doesn't work */}
              </label>
            </div>
            <p>Forgot <span className='blue'>username</span> or <span className='blue'>password</span>?</p> {/* have a popup that says 'too bad, remember better'*/}
          </section>
        </form>

      </div>
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);