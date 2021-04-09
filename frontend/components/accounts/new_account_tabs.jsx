import React from 'react';
import { withRouter } from 'react-router-dom';
import Navbar from '../home_user/navbar';
import SelectAccount from './select_account';
import LoginForm from '../home_guest/_login_form';
import NewUserForm from '../user/new_user_form_container';


class OpenAccountPage extends React.Component {
  constructor(props){
    super(props);
    this.state = { };
    this.handleNext = this.handleNext.bind(this);
  }

  selectExistingCustomer(e){
    this.setState({ existingCustomer: e.currentTarget.value })
  };

  handleSubmit(e){

  }

  handleNext(e){
    e.preventDefault();
    let btn = e.currentTarget;
    switch(btn.id){
      case 'to-step-2':
        // submit new user form
        document.getElementById('your-info-section').classList.add('hidden');
        document.getElementById('create-account-section').classList.remove('hidden');
        document.getElementById('step-1').classList.remove('selected');
        document.getElementById('step-2').classList.add('selected');
        return
      case 'to-step-3':
        // create new account
        document.getElementById('create-account-section').classList.add('hidden');
        document.getElementById('fund-account-section').classList.remove('hidden');
        document.getElementById('step-2').classList.remove('selected');
        document.getElementById('step-3').classList.add('selected');
        return
      case 'to-dashboard':
        this.props.history.push('/');
        return
      default:
        return;
    }
  };

  render(){
    return(
      <div className='tabs-container'>

        <Navbar />

        <ul className='step-nav'>
          <li id='step-1' className='selected'>
            <span className='circle-icon'>1</span>
            <h3>Your Information</h3>
          </li>
          <li id='step-2'>
            <span className='circle-icon'>2</span>
            <h3>Open Account</h3>
          </li>
          <li id='step-3'>
            <span className='circle-icon'>3</span>
            <h3>Fund Account</h3>
          </li>
        </ul>

        <ul className='tabs'>

          {/* Step 1: 'Your Information' -> creates a new user */}
          <section id='your-info-section'>
            <div className='informational'>
              <span className='circle-icon'>i</span>
              <p><em>Protect your money. </em> Fraudsters sometimes offer you money to open an account, then use your information to access your assets. Don’t open an account because someone you’ve never met in person asked you to, and don’t share your bank login information with anyone.</p>
            </div>
            {window.currentUser && 
            <div>
              <p>For your security, we ask that you confirm your credentials before moving to the next step.</p>
              <LoginForm/>
            </div>
            }
            {!window.currentUser &&
              <div className='existing-customer'>
                <label>I’m not an existing Ally Bank customer 
                  <input type='radio' name='existing-customer' value='no' onChange={this.selectExistingCustomer.bind(this)}/>
                </label>
                <label>I already have an account with Align Bank
                  <input type='radio' name='existing-customer' value='yes' onChange={this.selectExistingCustomer.bind(this)}/>
                </label>
                {this.state.existingCustomer === 'yes' && <LoginForm/>}
              </div>
            }
            {this.state.existingCustomer === 'no' && <NewUserForm/>}
            <button id='to-step-2' onClick={this.handleNext}>Next</button>
          </section>

          {/* Step 2: 'Create Account' -> creates a new account */}
          <section id='create-account-section' className='hidden' >
            <SelectAccount/>
            <button id='to-step-3' onClick={this.handleNext}>Next</button>
          </section>

          {/* Step 3: 'Fund Account' -> creates a new transfer */}
          <section id='fund-account-section' className='hidden'>
            <p>NEW TRANSFER FORM GOES HERE</p>
            <button id='to-dashboard' onClick={this.handleNext}>Next</button>
          </section>

        </ul>
      </div>
    )
  }
};

export default withRouter(OpenAccountPage);