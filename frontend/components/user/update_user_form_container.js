import React from 'react';
import { updateUser } from '../../actions/users_actions';
import UserForm from './_user_form';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { 
    userData: state.entities.users[state.session.id],
    submitText: 'Update',
    errors: state.errors.userErrors
  }
};

const mapDispatchToProps = dispatch => {
  return { processUser: userData => dispatch(updateUser(userData)) }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);