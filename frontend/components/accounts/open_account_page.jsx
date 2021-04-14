import React from 'react';
import { withRouter } from 'react-router-dom';
import Navbar from '../home_user/navbar';
import SelectAccount from './select_account';
import LoginForm from '../home_guest/_login_form';
import NewUserForm from '../user/new_user_form_container';
import NewTransferForm from '../transfers/new_transfer_form';
import { connect } from 'react-redux';
import { fetchAllAccounts } from '../../actions/account_actions';

const mapStateToProps = state => {
  return {
    accounts: Object.values(state.entities.accounts)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllAccounts: () => dispatch(fetchAllAccounts)
  }
}

class OpenAccountPage extends React.Component {
  constructor(props){
    super(props);
    this.state = { step: 1 };
  }

  componentDidMount(){
    this.props.fetchAllAccounts;
  }

  selectExistingCustomer(e){
    this.setState({ existingCustomer: e.currentTarget.value })
  };

  moveToNextStep(step){
    switch(step){
      case 2:
        document.getElementById('step-1').classList.remove('selected');
        document.getElementById('step-2').classList.add('selected');
        this.setState({ step });
        return;
      case 3:
        document.getElementById('step-2').classList.remove('selected');
        document.getElementById('step-3').classList.add('selected');
        this.setState({ step });
        return;
      case 4:
        this.props.history.push('/');
        return;
      default:
        return;
    }
  }

  render(){
    return(
      <div className='open-account-container'>

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

        <ul className='steps'>

          {/* Step 1: 'Your Information' -> creates a new user */}
          { this.state.step === 1 &&
            <section id='your-info-section'>
              <div className='informational'>
                <span className='circle-icon'>i</span>
                <p><em>Protect your money. </em> Fraudsters sometimes offer you money to open an account, then use your information to access your assets. Don’t open an account because someone you’ve never met in person asked you to, and don’t share your bank login information with anyone.</p>
              </div>
              {window.currentUser && 
              <div>
                <p>For your security, we ask that you confirm your credentials before moving to the next step.</p>
                <LoginForm updateParent={this.moveToNextStep.bind(this)}/>
              </div>
              }
              {!window.currentUser &&
                <div className='existing-customer'>
                  <h2>Choose the option that describes you best.</h2>
                  <div>
                    <input type='radio' id='no' name='existing-customer' value='no' onChange={this.selectExistingCustomer.bind(this)}/>
                    <label htmlFor='no'>I’m not an existing Align Bank customer </label> 
                  </div>
                  <div>
                    <input type='radio' id='yes' name='existing-customer' value='yes' onChange={this.selectExistingCustomer.bind(this)}/>
                    <label htmlFor='yes'>I already have an account with Align Bank</label>
                  </div>
                  {this.state.existingCustomer === 'yes' && <LoginForm updateParent={this.moveToNextStep.bind(this)}/>}
                </div>
              }
              {this.state.existingCustomer === 'no' && <NewUserForm updateParent={this.moveToNextStep.bind(this)}/>}
            </section>
          }

          {/* Step 2: 'Create Account' -> creates a new account */}
          <section id='create-account-section'>
            { this.state.step === 2 && <SelectAccount updateParent={this.moveToNextStep.bind(this)}/>}
          </section>

          {/* Step 3: 'Fund Account' -> creates a new transfer */}
          <section id='fund-account-section'>
            { this.state.step === 3 && <NewTransferForm accounts={this.props.accounts}/>}
          </section>

        </ul>
      </div>
    )
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OpenAccountPage));