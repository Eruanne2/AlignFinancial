import React from 'react';
import { fetchAllAccounts } from '../../../actions/account_actions';
import Navbar from '../../home_user/navbar';
import { Link } from 'react-router-dom';
import AccountsIndex from '../../accounts/accounts_index';
import ExternalAccountForm from './external_account_form';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { accounts: Object.values(state.entities.accounts) }
}
const mapDispatchToProps = dispatch => {
  return { fetchAllAccounts: () => dispatch(fetchAllAccounts()) }
};

class ManageExternalAccounts extends React.Component{
  constructor(props){
    super(props);
    this.state = { showForm: false }
  };

  componentDidMount(){
    this.props.fetchAllAccounts();
    // is this buggy??
  };

  render(){
    if (!this.props.accounts) return null;
    debugger
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
            <p>CV </p>
          </ul>
        </nav>

        <div className='external-accts-content'>
          <h1>Manage Linked Accounts</h1>

          <div className='external-accts-header'>
            <h2>My Other Accounts</h2>
            <button>+Add Accounts</button>
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
                <ul className='row'>
                  <li>{acct.nickname}••••{acct.acctNum % 10000}</li>
                  <li>{acct.acctType}</li>
                  <li><button>+</button></li>
                </ul>
                {/* {this.state.dropdown === acct.id &&  */}
                { true && 
                  <ul className='row-dropdown'>
                    <li><h3>More Info</h3></li>
                    <li><h3>Account Number: </h3> <p>{acct.acctNum}</p></li>
                    <li><h3>Routing Number: </h3> <p>{acct.routingNum}</p></li>
                    <li><button>Delete Account</button></li>
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