import React from 'react';
import { fetchAllAccounts } from '../../../actions/account_actions';
import Navbar from '../../home_user/navbar';
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
  componentDidMount(){
    this.props.fetchAllAccounts();
  }

  render(){
    if (!this.props.accounts) return null;
    return(
      <div>
        <Navbar/>
        <div className='external-accts-content'>
          <AccountsIndex
            accounts={this.props.accounts}
            filter={{external: true}}
            header={''}
            
            />
          <h1>'Link a new external account' button which toggles form</h1>
          <ExternalAccountForm/>
        </div>
      </div>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageExternalAccounts);