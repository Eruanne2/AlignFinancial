import React from 'react';
import Navbar from '../home_user/navbar';
import NewTransferForm from './new_transfer_form';
import TransfersIndex from './transfers_index';
import { connect } from 'react-redux';
import { fetchAllAccounts } from '../../actions/account_actions';
import { fetchAllTransfers } from '../../actions/transfer_actions';

const mapStateToProps = state => {
  return {
    accounts: Object.values(state.entities.accounts),
    transfers: Object.values(state.entities.transfers)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllAccounts: () => dispatch(fetchAllAccounts()),
    fetchAllTransfers: () => dispatch(fetchAllTransfers())
  }
};

class TransferPage extends React.Component{
  constructor(props){
    super(props);
    this.accounts = [];
    this.transfers = [];
  };

  componentDidMount(){
    this.accounts = this.props.fetchAllAccounts();
    this.transfers = this.props.fetchAllTransfers();
  };

  render(){
    if (!this.accounts || !this.transfers) return null;
    return(
      <div>
        <Navbar/>
        <NewTransferForm accounts={this.props.accounts} />
        <TransfersIndex transfers={this.props.transfers} filter={{ userId: window.currentUser.id}}/>
      </div>
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransferPage);