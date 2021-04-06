import { createUser } from '../../actions/users_actions';
import UserForm from './_user_form';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { 
    userData: {username: '', password: '', fname: '', lname: '', email: '', address: '', phone: ''},
    submitText: 'Next',
    errors: state.errors.userErrors
  }
};

const mapDispatchToProps = dispatch => {
  return { processUser: userData => dispatch(createUser(userData)) }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);