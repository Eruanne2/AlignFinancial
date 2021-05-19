import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle, faLock } from "@fortawesome/free-solid-svg-icons";

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
    this.props.login(this.state)
    .then(res => {if (!!this.props.updateParent) this.props.updateParent(2) })
  };

  handleChange(field){
    return e => this.setState({ [field]: e.currentTarget.value })
  };

  demoLogin(e){
    e.preventDefault();
    this.props.login({ username: 'DemoUser', password: 'password'});
    if (!!this.props.updateParent) {
      this.props.updateParent(2);
    }
  };

  render(){
    if (this.props.sidebar) return (
      <div className='sidebar-login-form-container'>

      <h1><i><FontAwesomeIcon icon={faLock}/></i>Login</h1>

      <form onSubmit={this.userLogin.bind(this)}>
        <span className='error'>
          {this.props.errors.length > 0 ? <i><FontAwesomeIcon icon={faExclamationCircle}/></i> : null }
          {this.props.errors}
        </span>
        <section className='login-inputs'>
          <div>
            <label htmlFor='login-username'>Username</label>
            <input id='login-username' type='text' value={this.state.username} onChange={this.handleChange('username')}/>
          </div>
          <div>
            <label htmlFor='login-password'>Password</label>
            <input id='login-password' type='password' value={this.state.password} onChange={this.handleChange('password')}/>
          </div>
        </section>
        <section>
          <div className='login-btns'>
            <input type='submit' value='Log In'/>
            <p>or</p>
            <button onClick={this.demoLogin.bind(this)}>Demo Log In</button>
            {/* <label>
              <input type='checkbox'/>Save Username
            </label> */}
          </div>
          <p>Forgot 
            <span id='forgot-username' className='blue'><Link to="/forgotten-info/username">username</Link></span> 
            or 
            <span id='forgot-password' className='blue'><Link to="/forgotten-info/password">password</Link></span>?
          </p>
        </section>
      </form>

    </div>
    )
    else return(
      <div className='login-form-container'>

          <h1>Login</h1>
          <span className='error'>
            {this.props.errors.length > 0 ? <i><FontAwesomeIcon icon={faExclamationCircle}/></i> : null }
            {this.props.errors}
          </span>

        <form onSubmit={this.userLogin.bind(this)}>
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
            <div>
              <input type='submit' value='Log In'/>
              <p>or</p>
              <button onClick={this.demoLogin.bind(this)}>Demo Log In</button>
              {/* <label>
                <input type='checkbox'/>Save Username
              </label> */}
            </div>
            <p>Forgot <span className='blue'>username</span> or <span className='blue'>password</span>?</p> {/* have a popup that says 'too bad, remember better'*/}
          </section>
        </form>

      </div>
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);