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
  componentDidMount(){
    this.props.fetchAllAccounts();
    this.props.fetchAllTransfers();
  };

  render(){
    if (!this.props.accounts || !this.props.transfers) return null;
    return(
      <div>
        <Navbar/>
        <NewTransferForm accounts={this.props.accounts}/>
        <TransfersIndex transfers={this.props.transfers}/>
      </div>
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransferPage);