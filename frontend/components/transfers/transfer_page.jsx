import React from 'react';
import Navbar from '../home_user/navbar';
import { Link } from 'react-router-dom';
import NewTransferForm from './new_transfer_form';
import TransfersIndex from './transfers_index';
import { connect } from 'react-redux';
import { fetchAllAccounts } from '../../actions/account_actions';
import { fetchAllTransfers } from '../../actions/transfer_actions';

const mapStateToProps = state => {
  return {
    accounts: state.entities.accounts, // do NOT change this to an array. it will be used for lookup by id
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
      <div className='transfer-page-container'>
        <Navbar/>
        <nav className='dash-nav'>
          <ul>
            <Link to='/transfer'>Transfers</Link>
            <a href='https://github.com/Eruanne2' target="_blank">Github</a>
            <a href='https://www.linkedin.com/in/charis-ginn-9abb93173/' target="_blank">LinkedIn</a>
            <a href='https://www.charisginn.com' target="_blank">Portfolio</a>
          </ul>
        </nav>

        <NewTransferForm accounts={this.props.accounts} />
        <TransfersIndex transfers={this.props.transfers} filter={{ userId: window.currentUser.id}}/>
      </div>
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransferPage);