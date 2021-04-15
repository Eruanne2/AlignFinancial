import React from 'react';
import { fetchAllAccounts, removeAccount } from '../../../actions/account_actions';
import Navbar from '../../home_user/navbar';
import { Link } from 'react-router-dom';
import ExternalAccountForm from './external_account_form';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { accounts: Object.values(state.entities.accounts) }
}
const mapDispatchToProps = dispatch => {
  return { 
    fetchAllAccounts: () => dispatch(fetchAllAccounts()),
    removeAccount: acctId => dispatch(removeAccount(acctId)) 
  }
};

class ManageExternalAccounts extends React.Component{
  constructor(props){
    super(props);
    this.state = { showForm: false, dropdown: 0 }
  };

  componentDidMount(){
    this.props.fetchAllAccounts();
  };

  toggleForm(e) {
    e.preventDefault();
    this.setState({ showForm: !this.state.showForm });
  }

  toggleDropdown(id) {
    return e => {
      (this.state.dropdown === id) ? this.setState({ dropdown: 0 }): this.setState({ dropdown: id});
    }
  };

  handleRemoveAcct(acctId){
    return e => this.props.removeAccount(acctId);
  }

  render(){
    if (!this.props.accounts) return null;
    return(
      <div className='external-accts-container'>
        <Navbar/>
        <nav className='dash-nav'>
          <ul>
            <Link to='/transfer'>Transfers</Link>
            <a href='https://github.com/Eruanne2' target="_blank">Github</a>
            <a href='https://www.linkedin.com/in/charis-ginn-9abb93173' target="_blank">LinkedIn</a>
            <p>CV</p>
            {/* <a href='' target="_blank">CV</a> */}
          </ul>
        </nav>

        <div className='external-accts-content'>
          <h1>Manage Linked Accounts</h1>

          <div className='external-accts-header'>
            <h2>My Other Accounts</h2>
            <button onClick={this.toggleForm.bind(this)}>+Add Accounts</button>
          </div>
          {this.state.showForm && <ExternalAccountForm/>}

          <div className='table'>
            <ul className='row'>
              <li>ACCOUNT</li>
              <li>TYPE</li>
              <li></li>
            </ul>
            {this.props.accounts.map((acct, idx) => {
              if (acct.userId !== window.currentUser.id || !acct.external) return null;
              else return <section key={idx}>
                <ul className='row'  onClick={this.toggleDropdown(acct.id)}>
                  <li>{acct.nickname}••••{acct.acctNum % 10000}</li>
                  <li>{acct.acctType}</li>
                  <li><button>+</button></li>
                </ul>
                {this.state.dropdown === acct.id && 
                  <ul className='row-dropdown'>
                    <li><h3>More Info</h3></li>
                    <li><h3>Account Number: </h3> <p>{acct.acctNum}</p></li>
                    <li><h3>Routing Number: </h3> <p>{acct.routingNum}</p></li>
                    <li><button onClick={this.handleRemoveAcct(acct.id)}>Delete Account</button></li>
                  </ul>
                }
              </section>
            })}
          </div>
          
        </div>
      </div>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageExternalAccounts);